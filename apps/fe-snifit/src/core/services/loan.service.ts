import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartialLoanDto } from '@mataf-poc/ods-mongoose';
import { PaginateResult } from 'mongoose';
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
}
