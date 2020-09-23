import { Module, HttpModule } from '@nestjs/common';
import { LoansController } from '../loans/loans.controller';
import { LoansService } from '../loans/loans.service';
import { LoanProductsService } from '../loan-products/loan-products.service';
import { LoanProductsController } from '../loan-products/loan-products.controller';

@Module({
  imports: [HttpModule],
  controllers: [LoansController, LoanProductsController],
  providers: [LoansService, LoanProductsService],
})
export class AppModule {}
