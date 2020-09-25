import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartialLoanDto } from '@mataf-poc/ods-mongoose';
import { PaginateResult } from 'mongoose';
import { RiskResult } from '@mataf-poc/models';
@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private httpClient: HttpClient) {}

  getAccountsLoans(
    accountNumbers: string[]
  ): Observable<PaginateResult<PartialLoanDto>> {
    return this.httpClient.post(
      `/api/loans/by/accounts`,
      accountNumbers
    ) as Observable<PaginateResult<PartialLoanDto>>;
  }

  check(
    accountNumber: string,
    loanCode: number,
    amount: number,
    term: number
  ): Observable<boolean | RiskResult> {
    return this.httpClient.get(`/api/loans/check/${accountNumber}`, {
      params: {
        accountNumber: accountNumber,
        loanCode: loanCode.toString(),
        amount: amount.toString(),
        term: term.toString(),
      },
    }) as Observable<boolean | RiskResult>;
  }

  take(
    accountNumber: string,
    loanCode: number,
    amount: number,
    term: number
  ): Observable<boolean | RiskResult> {
    return this.httpClient.get(`/api/loans/take/${accountNumber}`, {
      params: {
        accountNumber: accountNumber,
        loanCode: loanCode.toString(),
        amount: amount.toString(),
        term: term.toString(),
      },
    }) as Observable<boolean | RiskResult>;
  }
}
