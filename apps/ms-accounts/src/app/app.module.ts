import { Module, HttpModule } from '@nestjs/common';
import { AccountsController } from '../accounts/accounts.controller';
import { AccountsService } from '../accounts/accounts.service';
import { SubAccountsController } from '../sub-accounts/sub-accounts.controller';
import { PartnersController } from '../partners/partners.controller';
import { SubAccountsService } from '../sub-accounts/sub-accounts.service';
import { PartnersService } from '../partners/partners.service';

@Module({
  imports: [HttpModule],
  controllers: [AccountsController, SubAccountsController, PartnersController],
  providers: [AccountsService, SubAccountsService, PartnersService],
})
export class AppModule {}
