import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MatafSubAccount } from './sub-account.schema';
import { AccountType } from '@mataf-poc/models';
import { MatafAccountPartner } from '..';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class MatafAccount extends Document {
  @Prop()
  number: string;

  @Prop()
  holder: string;

  @Prop(
    raw({
      type: AccountType,
      default: AccountType.PERSONAL,
    })
  )
  type: AccountType;

  @Prop()
  branchNumber: number;

  @Prop()
  credit: number;

  @Prop()
  creditScoreRating: number; // 1 - 8

  @Prop(
    raw([{ type: MongooseSchema.Types.ObjectId, ref: 'MatafAccountPartner' }])
  )
  partners: MatafAccountPartner[] | MongooseSchema.Types.ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'MatafSubAccount' }])
  subAccounts: MatafSubAccount[] | MongooseSchema.Types.ObjectId[];
}

export const MatafAccountSchema = SchemaFactory.createForClass(MatafAccount);

MatafAccountSchema.plugin(mongoosePaginate);
