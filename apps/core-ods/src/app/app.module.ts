import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { OdsMongoModule } from '@mataf-poc/ods-mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansController } from './loans/loans.controller';
import { LoanProductsController } from './loans/loans-products.controller';
import { PartnerController } from './accounts/partners.controller';
import { SubAccountsController } from './accounts/sub-accounts.controller';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost/nest`), OdsMongoModule],
  controllers: [
    AccountsController,
    PartnerController,
    SubAccountsController,
    LoansController,
    LoanProductsController,
  ],
  providers: [],
})
export class AppModule {}
