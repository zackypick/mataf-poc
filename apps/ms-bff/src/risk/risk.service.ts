import { Logger, HttpService, HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { subComponentConfigs, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class RiskService {
  private readonly logger = new Logger(RiskService.name);
  private riskServicePort = subComponentConfigs[SubComponent.MS_RISK].port;

  constructor(private httpService: HttpService) {}

  getRisk(
    accountNumber: string,
    amount: number,
    term: number,
    loanCode: number
  ) {
    return this.httpService
      .get(
        `http://localhost:${this.riskServicePort}/api/risk/calculate/${accountNumber}`,
        {
          params: {
            amount,
            term,
            loanCode,
          },
        }
      )
      .pipe(pipeError, pipeResponse)
      .toPromise();
  }
}
