import { Module, HttpModule } from '@nestjs/common';
import { AccountsController } from '../accounts/accounts.controller';
import { AccountsService } from '../accounts/accounts.service';
import { LoansController } from '../loans/loans.controller';
import { RiskController } from '../risk/risk.controller';
import { LoansService } from '../loans/loans.service';
import { RiskService } from '../risk/risk.service';
import { LoanProductsController } from '../loan-products/loan-products.controller';
import { SubAccountsController } from '../sub-accounts/sub-accounts.controller';
import { PartnersController } from '../partners/partners.controller';
import { SubAccountsService } from '../sub-accounts/sub-accounts.service';
import { PartnersService } from '../partners/partners.service';
import { LoanProductsService } from '../loan-products/loan-products.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AccountsController,
    SubAccountsController,
    PartnersController,
    LoansController,
    LoanProductsController,
    RiskController,
  ],
  providers: [
    AccountsService,
    SubAccountsService,
    PartnersService,
    LoansService,
    LoanProductsService,
    RiskService,
  ],
})
export class AppModule {}
