import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MatafSubAccount } from '../schemas/accounts/sub-account.schema';
import { CreateSubAccountDto } from '../dtos/accounts/create-sub-account';

@Injectable()
export class ODSSubAccountService {
  constructor(
    @InjectModel(MatafSubAccount.name)
    private subAccountModel: PaginateModel<MatafSubAccount>
  ) {}

  async create(
    CreateSubAccountDto: CreateSubAccountDto
  ): Promise<MatafSubAccount> {
    const createdSubAccount = new this.subAccountModel(CreateSubAccountDto);

    return createdSubAccount.save();
  }

  async find(
    subAccount: Partial<CreateSubAccountDto>,
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafSubAccount>> {
    return this.subAccountModel.paginate(subAccount, pagination);
  }

  async findOne(
    subAccount: Partial<CreateSubAccountDto>
  ): Promise<MatafSubAccount> {
    return this.subAccountModel.findOne(subAccount).exec();
  }

  async findAll(
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafSubAccount>> {
    return this.subAccountModel.paginate({}, pagination);
  }

  async delete(number: string) {
    return this.subAccountModel.findOneAndRemove({ number }).exec();
  }

  async update(
    number: string,
    CreateSubAccountDto: Partial<CreateSubAccountDto>
  ) {
    return this.subAccountModel
      .findOneAndUpdate({ number }, CreateSubAccountDto)
      .exec();
  }

  async createOrUpdate(
    number: string,
    CreateSubAccountDto: Partial<CreateSubAccountDto>
  ) {
    return this.subAccountModel
      .findOneAndUpdate({ number }, CreateSubAccountDto, {
        upsert: true,
        new: true,
      })
      .exec();
  }

  async flush() {
    this.subAccountModel.deleteMany({}).exec();
  }
}
