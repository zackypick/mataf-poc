import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MatafSubAccountBalance } from './sub-account-balances.schema';
import { SubAccountType } from '@mataf-poc/models';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class MatafSubAccount extends Document {
  @Prop()
  number: string;

  @Prop()
  code: number;

  @Prop()
  public type: SubAccountType;

  @Prop()
  balances: MatafSubAccountBalance;
}

export const MatafSubAccountSchema = SchemaFactory.createForClass(
  MatafSubAccount
);

MatafSubAccountSchema.plugin(mongoosePaginate);
