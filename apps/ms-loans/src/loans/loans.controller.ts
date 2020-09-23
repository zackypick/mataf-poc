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
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
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
    @Body() accountNumbers: string[]
  ) {
    return this.loansService.find(
      { accountNumber: { $in: accountNumbers } },
      paginationDto
    );
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
}
