import {
  Injectable,
  HttpService,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateLoanDto,
  PaginationDto,
  PartialLoanDto,
  CreateLoanProductDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';
import { map } from 'rxjs/operators';
import { RiskService } from '../risk/risk.service';
import { RiskResult, SubAccountType, LoanStatus } from '@mataf-poc/models';
import { LoanProductsService } from '../loan-products/loan-products.service';
import { SubAccountsService } from '../sub-accounts/sub-accounts.service';
import { v4 } from 'uuid';
@Injectable()
export class LoansService {
  private msLoansBaseUrl = getComponentBaseURL(SubComponent.MS_LOANS);

  private logger = new Logger(LoansService.name);

  constructor(
    private httpService: HttpService,
    private riskService: RiskService,
    private loanProductService: LoanProductsService,
    private subAccountService: SubAccountsService
  ) {}

  async find(loan: Partial<CreateLoanDto>, paginationDto: PaginationDto) {
    return this.httpService
      .post(`${this.msLoansBaseUrl}/api/loans/find`, loan, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findByAccounts(accounts: string[], paginationDto: PaginationDto) {
    return this.httpService
      .post(`${this.msLoansBaseUrl}/api/loans/by/accounts`, accounts, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findByLoanNumber(loanNumber: string) {
    return this.httpService
      .get(`${this.msLoansBaseUrl}/api/loans/id/${loanNumber}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.httpService
      .get(`${this.msLoansBaseUrl}/api/loans/list`, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(loan: CreateLoanDto) {
    return this.httpService
      .post(`${this.msLoansBaseUrl}/api/loans/create`, loan)
      .pipe(pipeError, pipeResponse);
  }

  async update(loanNumber: string, CreateLoanDto: Partial<CreateLoanDto>) {
    return this.httpService
      .put(`${this.msLoansBaseUrl}/api/loans/${loanNumber}`, CreateLoanDto)
      .pipe(pipeError, pipeResponse);
  }

  async delete(loanNumber: string) {
    return this.httpService
      .delete(`${this.msLoansBaseUrl}/api/loans/${loanNumber}`)
      .pipe(pipeError, pipeResponse);
  }

  async getByPartnerId(id: string) {
    return this.httpService
      .get(`${this.msLoansBaseUrl}/api/loans/partner/${id}`)
      .pipe(pipeError, pipeResponse);
  }

  async getAccountLoans(accountNumber: string): Promise<PartialLoanDto[]> {
    return this.httpService
      .post(`${this.msLoansBaseUrl}/api/loans/find`, {
        accountNumber,
      })
      .pipe(map((response) => response.data.docs))
      .toPromise();
  }

  checkEligibility(loans: PartialLoanDto[]): boolean {
    return loans.some((l) => !l.hasDefaulted);
  }

  async checkAndCalculateLoan(
    accountNumber: string,
    amount: number,
    term: number,
    loanCode: number
  ) {
    const loans = await this.getAccountLoans(accountNumber);

    if (!this.checkEligibility(loans)) {
      return false;
    }
    return this.riskService.getRisk(accountNumber, amount, term, loanCode);
  }

  async takLoan(
    accountNumber: string,
    amount: number,
    term: number,
    loanCode: number
  ) {
    const result = await this.checkAndCalculateLoan(
      accountNumber,
      amount,
      term,
      loanCode
    ).then((r) => r.valueOf());
    if (!result) {
      throw new HttpException('Not eligible', HttpStatus.FORBIDDEN);
    }
    const riskResult = result as RiskResult;

    const product: CreateLoanProductDto = await (
      await this.loanProductService.findByProductCode(loanCode)
    ).toPromise();

    // create sub account
    const subAccountNumber = v4();
    const subAccountResult = await this.subAccountService.create(
      accountNumber,
      {
        code: product.loanCode,
        number: subAccountNumber,
        type: SubAccountType.LOANS,
        balances: {
          currency: product.currency,
          valueDate: Date.now(),
          currentBalance: amount,
          withdrawalBalance: amount,
          closingBalance: amount,
        },
      }
    );
    // create loan
    const loanResult = await this.create({
      loanNumber: v4(),
      accountNumber: accountNumber,
      status: LoanStatus.IN_PROCESS,
      currency: product.currency,
      code: product.loanCode,
      amount: amount,
      loanTermMonths: term,
      dateTaken: Date.now(),
      hasDefaulted: false,
      //TODO add moment
      dateClosed: Date.now() + term * 2592000000,
      monthlyPayment: (amount / term) * riskResult.rate,
      lastMonthlyPayment: (amount / term) * riskResult.rate,
    });

    return Promise.all([subAccountResult.toPromise(), loanResult.toPromise()]);
  }
}
