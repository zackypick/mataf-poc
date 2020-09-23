import { Injectable, HttpService, Logger } from '@nestjs/common';
import {
  CreateLoanProductDto,
  PartialLoanProductDto,
  UpdateLoanProductDto,
} from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';

@Injectable()
export class LoanProductsService {
  private coreODSBaseUrl = getComponentBaseURL(SubComponent.CORE_ODS);

  private logger = new Logger(LoanProductsService.name);

  constructor(private httpService: HttpService) {}

  async find(loanProduct: PartialLoanProductDto) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/products/find`, loanProduct)
      .pipe(pipeError, pipeResponse);
  }

  async findByProductCode(code: number) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/loans/products/id/${code}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll() {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/loans/products/list`)
      .pipe(pipeError, pipeResponse);
  }

  async create(loanProduct: CreateLoanProductDto) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/products/create`, loanProduct)
      .pipe(pipeError, pipeResponse);
  }

  async update(code: number, CreateLoanDto: UpdateLoanProductDto) {
    return this.httpService
      .put(`${this.coreODSBaseUrl}/api/loans/products/${code}`, CreateLoanDto)
      .pipe(pipeError, pipeResponse);
  }

  async delete(code: number) {
    return this.httpService
      .delete(`${this.coreODSBaseUrl}/api/loans/products/${code}`)
      .pipe(pipeError, pipeResponse);
  }
}
