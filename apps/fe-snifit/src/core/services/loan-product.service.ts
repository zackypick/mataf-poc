import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartialLoanProductDto } from '@mataf-poc/ods-mongoose';
@Injectable({
  providedIn: 'root',
})
export class LoanProductService {
  constructor(private httpClient: HttpClient) {}

  getLoanProducts(): Observable<PartialLoanProductDto[]> {
    return this.httpClient.get('/api/loans/products/list') as Observable<
      PartialLoanProductDto[]
    >;
  }
}
