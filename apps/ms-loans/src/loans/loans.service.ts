import { Injectable, HttpService, Logger } from '@nestjs/common';
import { CreateLoanDto, PaginationDto } from '@mataf-poc/ods-mongoose';
import { getComponentBaseURL, SubComponent } from '@mataf-poc/shared';
import { pipeError, pipeResponse } from '@mataf-poc/utils';
@Injectable()
export class LoansService {
  private coreODSBaseUrl = getComponentBaseURL(SubComponent.CORE_ODS);

  private logger = new Logger(LoansService.name);

  constructor(private httpService: HttpService) {}

  async find(query: Object, paginationDto: PaginationDto) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/find`, query, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async findByLoanNumber(loanNumber: string) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/loans/id/${loanNumber}`)
      .pipe(pipeError, pipeResponse);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.httpService
      .get(`${this.coreODSBaseUrl}/api/loans/list`, {
        params: paginationDto,
      })
      .pipe(pipeError, pipeResponse);
  }

  async create(loan: CreateLoanDto) {
    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/create`, loan)
      .pipe(pipeError, pipeResponse);
  }

  async update(loanNumber: string, CreateLoanDto: Partial<CreateLoanDto>) {
    return this.httpService
      .put(`${this.coreODSBaseUrl}/api/loans/${loanNumber}`, CreateLoanDto)
      .pipe(pipeError, pipeResponse);
  }

  async delete(loanNumber: string) {
    return this.httpService
      .delete(`${this.coreODSBaseUrl}/api/loans/${loanNumber}`)
      .pipe(pipeError, pipeResponse);
  }

  async getByPartnerId(id: string) {
    const partners = await this.httpService
      .post(`${this.coreODSBaseUrl}/api/partners/find`, { id })
      .toPromise();

    return this.httpService
      .post(`${this.coreODSBaseUrl}/api/loans/find`, {
        accountNumber: { $in: partners.data.docs.map((p) => p.accountNumber) },
      })
      .pipe(pipeError, pipeResponse);
  }
}
