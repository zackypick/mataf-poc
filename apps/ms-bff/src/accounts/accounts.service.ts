import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  CreateAccountDto,
  PaginationDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class AccountsService {
  private msAccountBaseUrl = getComponentBaseURL(SubComponent.MS_ACCOUNTS);

  private logger = new Logger(AccountsService.name);

  constructor(private httpService: HttpService) {}

  async find(
    account: Partial<CreateAccountDto>,
    paginationDto: PaginationDto,
    populateDto?: PopulateAccountFieldsDto
  ) {
    return this.httpService
      .post(`${this.msAccountBaseUrl}/api/accounts/find`, account, {
        params: { ...paginationDto, ...populateDto },
      })
      .pipe(pipeError, pipeResponse);
  }

  async findByAccountNumber(
    accountNumber: string,
    populateDto?: PopulateAccountFieldsDto
  ) {
    return this.httpService
      .get(`${this.msAccountBaseUrl}/api/accounts/id/${accountNumber}`, {
        params: populateDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findAll(
    paginationDto: PaginationDto,
    populateDto?: PopulateAccountFieldsDto
  ) {
    this.logger.log(`${this.msAccountBaseUrl}/api/accounts/list`);
    return this.httpService
      .get(`${this.msAccountBaseUrl}/api/accounts/list`, {
        params: { ...paginationDto, ...populateDto },
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(account: CreateAccountDto) {
    return this.httpService
      .post(`${this.msAccountBaseUrl}/api/accounts/create`, account)
      .pipe(pipeError, pipeResponse);
  }

  async update(
    accountNumber: string,
    createAccountDto: Partial<CreateAccountDto>
  ) {
    return this.httpService
      .put(
        `${this.msAccountBaseUrl}/api/accounts/${accountNumber}`,
        createAccountDto
      )
      .pipe(pipeError, pipeResponse);
  }

  async delete(accountNumber: string) {
    return this.httpService
      .delete(`${this.msAccountBaseUrl}/api/accounts/${accountNumber}`)
      .pipe(pipeError, pipeResponse);
  }
}
