import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  PaginationDto,
  PartialPartnerDto,
  CreatePartnerDto,
  UpdatePartnerDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';
import { PaginateResult } from 'mongoose';

@Injectable()
export class PartnersService {
  private coreODSBaseUrl = getComponentBaseURL(SubComponent.CORE_ODS);

  private logger = new Logger(PartnersService.name);

  constructor(private httpService: HttpService) {}

  async find(partner: PartialPartnerDto, paginationDto: PaginationDto) {
    return this.httpService
      .post<PaginateResult<PartialPartnerDto>>(
        `${this.coreODSBaseUrl}/api/partners/find`,
        partner,
        {
          params: paginationDto,
        }
      )
      .pipe(pipeError, pipeResponse);
  }

  async findById(id: string) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/partners/id/${id}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/partners/list`, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(partner: CreatePartnerDto) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/partners/create`, partner)
      .pipe(pipeError, pipeResponse);
  }

  async update(
    id: string,
    accountNumber: string,
    createPartnerDto: UpdatePartnerDto
  ) {
    return this.httpService
      .put(`${this.coreODSBaseUrl}/api/partners/${id}`, createPartnerDto, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }

  async delete(id: string, accountNumber: string) {
    return this.httpService
      .delete(`${this.coreODSBaseUrl}/api/partners/${id}`, {
        params: { accountNumber },
      })
      .pipe(pipeError, pipeResponse);
  }
}
