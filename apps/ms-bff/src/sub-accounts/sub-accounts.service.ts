import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  PaginationDto,
  PartialSubAccountDto,
  CreateSubAccountDto,
  UpdateSubAccountDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class SubAccountsService {
  private msAccountsBaseUrl = getComponentBaseURL(SubComponent.MS_ACCOUNTS);

  private logger = new Logger(SubAccountsService.name);

  constructor(private httpService: HttpService) {}

  async find(account: PartialSubAccountDto, paginationDto: PaginationDto) {
    return this.httpService
      .post(`${this.msAccountsBaseUrl}/api/sub-accounts/find`, account, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findBySubAccountNumber(accountNumber: string) {
    return this.httpService
      .get(`${this.msAccountsBaseUrl}/api/sub-accounts/id/${accountNumber}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll(paginationDto: PaginationDto) {
    this.logger.log(`${this.msAccountsBaseUrl}/api/sub-accounts/list`);
    return this.httpService
      .get(`${this.msAccountsBaseUrl}/api/sub-accounts/list`, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(accountNumber: string, subAccount: CreateSubAccountDto) {
    return this.httpService
      .post(`${this.msAccountsBaseUrl}/api/sub-accounts/create`, subAccount, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }

  async update(
    accountNumber: string,
    updateSubAccountDtp: UpdateSubAccountDto
  ) {
    return this.httpService
      .put(
        `${this.msAccountsBaseUrl}/api/sub-accounts/${accountNumber}`,
        updateSubAccountDtp
      )
      .pipe(pipeError, pipeResponse);
  }

  async delete(accountNumber: string, number: string) {
    return this.httpService
      .delete(`${this.msAccountsBaseUrl}/api/sub-accounts/${number}`, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }
}
