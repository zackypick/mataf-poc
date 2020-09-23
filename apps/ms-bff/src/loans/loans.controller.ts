import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import {
  PaginationDto,
  ParsePaginationPipe,
  CreateLoanDto,
  UpdateLoanDto,
  PartialLoanDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('loans')
@Controller('loans')
export class LoansController {
  private logger = new Logger(LoansController.name);

  constructor(private readonly loansService: LoansService) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() loan: PartialLoanDto
  ) {
    return this.loansService.find(loan, paginationDto);
  }

  @Post('by/accounts')
  @UsePipes(new ParsePaginationPipe())
  async findByAccounts(
    @Query() paginationDto: PaginationDto,
    @Body() accounts: string[]
  ) {
    return this.loansService.findByAccounts(accounts, paginationDto);
  }

  @ApiParam({ name: 'loanNumber', description: 'Loan Number' })
  @Get('id/:loanNumber')
  async findById(@Param('loanNumber') loanNumber: string) {
    return this.loansService.findByLoanNumber(loanNumber);
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    this.logger.log('Get loans list');

    return this.loansService.findAll(paginationDto);
  }

  @Post('create')
  async create(@Body() loan: CreateLoanDto) {
    return this.loansService.create(loan);
  }

  @ApiParam({ name: 'number', description: 'loan Number' })
  @Put(':number')
  async update(@Param('number') number: string, @Body() loan: UpdateLoanDto) {
    return this.loansService.update(number, loan);
  }

  @ApiParam({ name: 'number', description: 'loan Number' })
  @Delete(':number')
  async delete(@Param('number') loanNumber: string) {
    return this.loansService.delete(loanNumber);
  }

  @ApiParam({ name: 'id', description: 'Partner ID' })
  @Get('partner/:id')
  async getByPartnerId(@Param('id') id: string) {
    return this.loansService.getByPartnerId(id);
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @ApiQuery({ name: 'amount', description: 'Loan Amount' })
  @ApiQuery({ name: 'term', description: 'Loan Term (months)' })
  @ApiQuery({ name: 'loanCode', description: 'Loan Product Code' })
  @Get('check/:accountNumber')
  async checkLoan(
    @Param('accountNumber') accountNumber: string,
    @Query('amount') amount: number,
    @Query('term') term: number,
    @Query('loanCode') loanCode: number
  ) {
    return this.loansService.checkAndCalculateLoan(
      accountNumber,
      amount,
      term,
      loanCode
    );
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @ApiQuery({ name: 'amount', description: 'Loan Amount' })
  @ApiQuery({ name: 'term', description: 'Loan Term (months)' })
  @ApiQuery({ name: 'loanCode', description: 'Loan Product Code' })
  @Get('take/:accountNumber')
  async takeLoan(
    @Param('accountNumber') accountNumber: string,
    @Query('amount') amount: number,
    @Query('term') term: number,
    @Query('loanCode') loanCode: number
  ) {
    return this.loansService.takLoan(accountNumber, amount, term, loanCode);
  }
}
