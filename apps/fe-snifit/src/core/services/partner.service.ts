import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartialAccountDto } from '@mataf-poc/ods-mongoose';
import { PaginateResult } from 'mongoose';
@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private httpClient: HttpClient) {}

  getPartnerAccounts(
    id: string
  ): Observable<PaginateResult<PartialAccountDto>> {
    return this.httpClient.get(
      `/api/partners/id/${id}/accounts?populate=partners&populate=subAccounts`
    ) as Observable<PaginateResult<PartialAccountDto>>;
  }
}
