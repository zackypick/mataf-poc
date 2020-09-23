import {
  PaginateModel,
  PaginateResult,
  PaginateOptions,
  Query,
} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MatafAccountPartner } from '../schemas/accounts/partner.schema';
import { CreatePartnerDto } from '../dtos/accounts/create-partner';

@Injectable()
export class ODSPartnerService {
  constructor(
    @InjectModel(MatafAccountPartner.name)
    private partnerModel: PaginateModel<MatafAccountPartner>
  ) {}

  async create(
    CreatePartnerDto: CreatePartnerDto
  ): Promise<MatafAccountPartner> {
    const createdPartner = new this.partnerModel(CreatePartnerDto);

    return createdPartner.save();
  }

  async find(
    partner: Partial<CreatePartnerDto>,
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafAccountPartner>> {
    return this.partnerModel.paginate(partner, pagination);
  }

  async findOne(
    partner: Partial<CreatePartnerDto>
  ): Promise<MatafAccountPartner> {
    return this.partnerModel.findOne(partner).exec();
  }

  async findAll(
    pagination: PaginateOptions
  ): Promise<PaginateResult<MatafAccountPartner>> {
    return this.partnerModel.paginate({}, pagination);
  }

  async delete(id: string, accountNumber: string) {
    return this.partnerModel.findOneAndRemove({ id, accountNumber }).exec();
  }

  async update(
    id: string,
    accountNumber: string,
    CreatePartnerDto: Partial<CreatePartnerDto>
  ) {
    return this.partnerModel.findOneAndUpdate(
      { id, accountNumber },
      CreatePartnerDto
    );
  }

  async createOrUpdate(
    id: string,
    accountNumber: string,
    CreatePartnerDto: Partial<CreatePartnerDto>
  ) {
    return this.partnerModel
      .findOneAndUpdate({ id, accountNumber }, CreatePartnerDto, {
        upsert: true,
        new: true,
      })
      .exec();
  }

  async flush() {
    this.partnerModel.deleteMany({}).exec();
  }
}
