import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Currency } from '@mataf-poc/models';

@Schema()
export class MatafLoanProduct extends Document {
  @Prop()
  name: string;

  @Prop()
  loanCode: number;

  @Prop()
  subAccountTypeCode: number;

  @Prop()
  creditScoreLimit: number; // 1 - 8

  @Prop()
  maxLoanAmount: number;

  @Prop()
  maxLoanTermMonths: number;

  @Prop()
  currency: Currency;

  @Prop()
  loanRate: number;
}

export const MatafLoanProductSchema = SchemaFactory.createForClass(
  MatafLoanProduct
);
