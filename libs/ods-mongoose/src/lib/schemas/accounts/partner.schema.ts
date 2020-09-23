import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountPartnerType } from '@mataf-poc/models';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class MatafAccountPartner extends Document {
  @Prop()
  id: string;

  @Prop()
  accountNumber: string;

  @Prop(
    raw({
      type: AccountPartnerType,
      default: AccountPartnerType.OWNER,
    })
  )
  role: AccountPartnerType;

  @Prop()
  name: string;
}

export const MatafAccountPartnerSchema = SchemaFactory.createForClass(
  MatafAccountPartner
);

MatafAccountPartnerSchema.plugin(mongoosePaginate);
