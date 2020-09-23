import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MatafLoanProduct } from '../schemas/loans/loan-products.schema';
import {
  CreateLoanProductDto,
  PartialLoanProductDto,
  UpdateLoanProductDto,
} from '../dtos/loans/create-loan-products';

@Injectable()
export class ODSLoanProductsService {
  constructor(
    @InjectModel(MatafLoanProduct.name)
    private loanProductsModel: Model<MatafLoanProduct>
  ) {}

  async create(
    CreateLoanProductDto: CreateLoanProductDto
  ): Promise<MatafLoanProduct> {
    const createdLoanProduct = new this.loanProductsModel(CreateLoanProductDto);

    return createdLoanProduct.save();
  }

  async find(loanProduct: PartialLoanProductDto): Promise<MatafLoanProduct[]> {
    return this.loanProductsModel.find(loanProduct).exec();
  }

  async findOne(
    loanProduct: Partial<CreateLoanProductDto>
  ): Promise<MatafLoanProduct> {
    return this.loanProductsModel.findOne(loanProduct).exec();
  }

  async findAll(): Promise<MatafLoanProduct[]> {
    return this.loanProductsModel.find().exec();
  }

  async delete(loanCode: number) {
    return this.loanProductsModel.deleteOne({ loanCode }).exec();
  }

  async update(code: number, updateLoanProductDto: UpdateLoanProductDto) {
    return this.loanProductsModel
      .findOneAndUpdate({ loanCode: code }, updateLoanProductDto)
      .exec();
  }

  async createOrUpdate(
    code: number,
    createLoanProductDto: Partial<CreateLoanProductDto>
  ) {
    return this.loanProductsModel
      .findOneAndUpdate({ loanCode: code }, createLoanProductDto, {
        upsert: true,
      })
      .exec();
  }

  async flush() {
    this.loanProductsModel.deleteMany({}).exec();
  }
}
