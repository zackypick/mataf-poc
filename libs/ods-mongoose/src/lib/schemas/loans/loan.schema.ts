import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Currency, LoanStatus } from '@mataf-poc/models';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class MatafLoan extends Document {
  @Prop()
  accountNumber: string;

  @Prop()
  loanNumber: string;

  @Prop()
  amount: number;

  @Prop(
    raw({
      type: LoanStatus,
      default: LoanStatus.IN_PROCESS,
    })
  )
  status: any;

  @Prop()
  code: number;

  @Prop()
  dateTaken: number;

  @Prop()
  dateClosed: number;

  @Prop()
  hasDefaulted: boolean;

  @Prop()
  monthlyPayment: number;

  @Prop()
  lastMonthlyPayment: number;

  @Prop()
  loanTermMonths: number;

  @Prop()
  currency: Currency;
}

export const MatafLoanSchema = SchemaFactory.createForClass(MatafLoan);

MatafLoanSchema.plugin(mongoosePaginate);
