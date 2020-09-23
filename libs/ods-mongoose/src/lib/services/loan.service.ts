import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MatafLoan } from '../schemas/loans/loan.schema';
import { CreateLoanDto } from '../dtos/loans/create-loan';

@Injectable()
export class ODSLoanService {
  constructor(
    @InjectModel(MatafLoan.name)
    private loanModel: PaginateModel<MatafLoan>
  ) {}

  async create(CreateLoanDto: CreateLoanDto): Promise<MatafLoan> {
    const createdLoan = new this.loanModel(CreateLoanDto);

    return createdLoan.save();
  }

  async find(
    loan: Partial<CreateLoanDto>,
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafLoan>> {
    return this.loanModel.paginate(loan, pagination);
  }

  async findOne(loan: Partial<CreateLoanDto>): Promise<MatafLoan> {
    return this.loanModel.findOne(loan).exec();
  }

  async findAll(
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafLoan>> {
    return this.loanModel.paginate({}, pagination);
  }
  // TODO use unique
  async delete(loanNumber: string) {
    return this.loanModel.deleteOne({ loanNumber }).exec();
  }

  async update(loanNumber: string, CreateLoanDto: Partial<CreateLoanDto>) {
    return this.loanModel
      .findOneAndUpdate({ loanNumber }, CreateLoanDto)
      .exec();
  }

  async createOrUpdate(code: number, CreateLoanDto: Partial<CreateLoanDto>) {
    return this.loanModel
      .findOneAndUpdate({ code }, CreateLoanDto, {
        upsert: true,
      })
      .exec();
  }

  async flush() {
    this.loanModel.deleteMany({}).exec();
  }
}
