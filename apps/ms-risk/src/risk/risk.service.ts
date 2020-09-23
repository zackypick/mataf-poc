import {
  Injectable,
  Logger,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import {
  PartialLoanProductDto,
  PartialLoanDto,
  PopulatedAccountDto,
} from '@mataf-poc/ods-mongoose';
import { map } from 'rxjs/operators';
import { Risk, RiskResult } from '@mataf-poc/models';

// TODO get real rates
const currencyRateMap = {
  ILS: 1,
  USD: 3.5,
  EUR: 4,
};

const rateFactorByRisk = {
  low: 1,
  medium: 1.2,
  high: 1.5,
};

const rateAdditionPerMonth = 0.0083;
@Injectable()
export class RiskService {
  private coreODSBaseUrl = getComponentBaseURL(SubComponent.CORE_ODS);

  private logger = new Logger(RiskService.name);

  constructor(private httpService: HttpService) {}
  async getAccountLoans(accountNumber: string): Promise<PartialLoanDto[]> {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/find`, {
        accountNumber,
      })
      .pipe(map((response) => response.data.docs))
      .toPromise();
  }

  async getLoanProduct(code: number): Promise<PartialLoanProductDto> {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/loans/products/id/${code}`)
      .pipe(map((response) => response.data))
      .toPromise();
  }

  async getAccount(accountNumber: string): Promise<PopulatedAccountDto> {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/accounts/id/${accountNumber}`, {
        params: { populate: ['subAccounts'] },
      })
      .pipe(map((response) => response.data))
      .toPromise();
  }

  async calculateRisk(
    accountNumber: string,
    amount: number,
    term: number,
    loanCode: number
  ): Promise<RiskResult> {
    const loans = await this.getAccountLoans(accountNumber);

    const loanProduct = await this.getLoanProduct(loanCode);

    if (!loanProduct) {
      throw new HttpException('Invalid Loan Code', HttpStatus.BAD_REQUEST);
    }
    const totalLoans = loans.reduce((sum, loan) => loan.amount + sum, amount);
    //fetch account with sub accounts
    const account = await this.getAccount(accountNumber);

    const { creditScoreRating: csr, subAccounts } = account;
    // get all balances from all
    const balances = subAccounts.map((sa) => sa.balances);

    const aggregateBalance = balances.reduce(
      (total, balance) =>
        total + currencyRateMap[balance.currency] * balance.currentBalance,
      0
    );

    const risk = this.getRisk(csr, totalLoans, aggregateBalance);

    const baseRate = rateFactorByRisk[risk] * loanProduct.loanRate;

    return {
      rate: baseRate + term * rateAdditionPerMonth,
      risk,
    };
  }

  getRisk(csr: number, totalLoans: number, aggregateBalance: number): Risk {
    if (totalLoans < aggregateBalance && csr < 2) {
      return 'low';
    } else if (totalLoans < 2 * aggregateBalance && csr < 4) {
      return 'medium';
    } else {
      return 'high';
    }
  }
}
