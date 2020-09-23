import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  PaginationDto,
  PartialPartnerDto,
  CreatePartnerDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class PartnersService {
  private msAccountsBaseUrl = getComponentBaseURL(SubComponent.MS_ACCOUNTS);

  private logger = new Logger(PartnersService.name);

  constructor(private httpService: HttpService) {}

  async find(partner: PartialPartnerDto, paginationDto: PaginationDto) {
    return this.httpService
      .post(`${this.msAccountsBaseUrl}/api/partners/find`, partner, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findById(id: string) {
    return this.httpService
      .get(`${this.msAccountsBaseUrl}/api/partners/id/${id}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.httpService
      .get(`${this.msAccountsBaseUrl}/api/partners/list`, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(partner: CreatePartnerDto) {
    return this.httpService
      .post(`${this.msAccountsBaseUrl}/api/partners/create`, partner)
      .pipe(pipeError, pipeResponse);
  }

  async update(
    id: string,
    accountNumber: string,
    createPartnerDto: PartialPartnerDto
  ) {
    return this.httpService
      .put(`${this.msAccountsBaseUrl}/api/partners/${id}`, createPartnerDto, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }

  async delete(id: string, accountNumber: string) {
    return this.httpService
      .delete(`${this.msAccountsBaseUrl}/api/partners/${id}`, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }

  async getPartnerAccounts(
    id: string,
    paginationDto: PaginationDto,
    populateDto?: PopulateAccountFieldsDto
  ) {
    return this.httpService
      .get(`${this.msAccountsBaseUrl}/api/partners/id/${id}/accounts`, {
        params: { ...paginationDto, ...populateDto },
      })
      .pipe(pipeError, pipeResponse);
  }
}
