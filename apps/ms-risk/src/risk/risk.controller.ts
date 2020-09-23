import { Controller, Get, Param, Query } from '@nestjs/common';

import { RiskService } from './risk.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @ApiQuery({ name: 'amount', description: 'Loan Amount' })
  @ApiQuery({ name: 'term', description: 'Loan Term (months)' })
  @ApiQuery({ name: 'loanCode', description: 'Loan Product Code' })
  @Get('calculate/:accountNumber')
  async calculateRisk(
    @Param('accountNumber') accountNumber: string,
    @Query('amount') amount: number,
    @Query('term') term: number,
    @Query('loanCode') loanCode: number
  ) {
    return this.riskService.calculateRisk(
      accountNumber,
      amount,
      term,
      loanCode
    );
  }
}
