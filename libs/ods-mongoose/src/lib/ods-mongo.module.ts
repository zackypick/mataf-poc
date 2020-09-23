import { Module } from '@nestjs/common';
import { ODSAccountsService } from './services/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MatafAccount,
  MatafAccountSchema,
} from './schemas/accounts/account.schema';
import {
  ODSPartnerService,
  ODSSubAccountService,
  ODSLoanService,
  ODSLoanProductsService,
} from './services';
import {
  MatafAccountPartner,
  MatafAccountPartnerSchema,
  MatafLoan,
  MatafLoanSchema,
  MatafLoanProductSchema,
  MatafLoanProduct,
} from './schemas';
import {
  MatafSubAccount,
  MatafSubAccountSchema,
} from './schemas/accounts/sub-account.schema';

// TODO fix this and move to config
import * as mongoosePaginate from 'mongoose-paginate';
//@ts-ignore
mongoosePaginate.paginate.options = {
  limit: 100,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatafAccount.name, schema: MatafAccountSchema },
      { name: MatafAccountPartner.name, schema: MatafAccountPartnerSchema },
      { name: MatafSubAccount.name, schema: MatafSubAccountSchema },
      { name: MatafLoan.name, schema: MatafLoanSchema },
      { name: MatafLoanProduct.name, schema: MatafLoanProductSchema },
    ]),
  ],
  providers: [
    ODSAccountsService,
    ODSPartnerService,
    ODSSubAccountService,
    ODSLoanService,
    ODSLoanProductsService,
  ],
  exports: [
    ODSAccountsService,
    ODSPartnerService,
    ODSSubAccountService,
    ODSLoanService,
    ODSLoanProductsService,
  ],
})
export class OdsMongoModule {}
