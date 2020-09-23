import {
  PaginateModel,
  PaginateResult,
  PaginateOptions,
  Query,
  UpdateQuery,
  FilterQuery,
} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MatafAccount } from '../schemas/accounts/account.schema';
import { CreateAccountDto } from '../dtos/accounts/create-account';

@Injectable()
export class ODSAccountsService {
  constructor(
    @InjectModel(MatafAccount.name)
    private accountModel: PaginateModel<MatafAccount>
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<MatafAccount> {
    const createdAccount = new this.accountModel(createAccountDto);

    return createdAccount.save();
  }

  async find(
    query: Object,
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafAccount>> {
    return this.accountModel.paginate(query, pagination);
  }

  async findOne(
    account: Partial<CreateAccountDto>,
    populate?: string[]
  ): Promise<MatafAccount> {
    return this.accountModel.findOne(account).populate(populate);
  }

  async findAll(
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafAccount>> {
    return this.accountModel.paginate({}, pagination);
  }

  async delete(accountNumber: string) {
    return this.accountModel.deleteOne({ number: accountNumber }).exec();
  }

  async update(
    query: FilterQuery<MatafAccount>,
    updateAccountDto: FilterQuery<UpdateQuery<MatafAccount>>
  ) {
    return this.accountModel.findOneAndUpdate(query, updateAccountDto).exec();
  }

  async createOrUpdate(
    accountNumber: string,
    createAccountDto: Partial<MatafAccount>
  ) {
    return this.accountModel
      .findOneAndUpdate({ number: accountNumber }, createAccountDto, {
        upsert: true,
      })
      .exec();
  }

  async flush() {
    this.accountModel.deleteMany({}).exec();
  }
}
