import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  PaginationDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class AccountsService {
  private coreODSBaseUrl = getComponentBaseURL(SubComponent.CORE_ODS);

  private logger = new Logger(AccountsService.name);

  constructor(private httpService: HttpService) {}

  async find(
    query: Object,
    paginationDto: PaginationDto,
    populateDto?: PopulateAccountFieldsDto
  ) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/accounts/find`, query, {
        params: { ...paginationDto, ...paginationDto },
      })
      .pipe(pipeError, pipeResponse);
  }

  async findByAccountNumber(
    accountNumber: string,
    populateDto?: PopulateAccountFieldsDto
  ) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/accounts/id/${accountNumber}`, {
        params: populateDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findAll(
    paginationDto: PaginationDto,
    populateDto?: PopulateAccountFieldsDto
  ) {
    this.logger.log(`${this.coreODSBaseUrl}/api/accounts/list`);
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/accounts/list`, {
        params: { ...paginationDto, ...paginationDto },
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(account: Object) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/accounts/create`, account)
      .pipe(pipeError, pipeResponse);
  }

  async update(accountNumber: string, updateAccountDto: Object) {
    return this.httpService
      .put(
        `${this.coreODSBaseUrl}/api/accounts/${accountNumber}`,
        updateAccountDto
      )
      .pipe(pipeError, pipeResponse);
  }

  async delete(accountNumber: string) {
    return this.httpService
      .delete(`${this.coreODSBaseUrl}/api/accounts/${accountNumber}`)
      .pipe(pipeError, pipeResponse);
  }
}
