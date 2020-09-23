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
import {
  CreateLoanDto,
  PaginationDto,
  ParsePaginationPipe,
  ODSLoanService,
  PartialLoanDto,
  UpdateLoanDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('loans')
export class LoansController {
  private logger = new Logger(LoansController.name);

  constructor(private readonly odsLoansService: ODSLoanService) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() loan: PartialLoanDto
  ) {
    return this.odsLoansService.find(loan, paginationDto);
  }

  @ApiParam({ name: 'loanNumber', description: 'Loan Number' })
  @Get('id/:loanNumber')
  async findById(@Param('loanNumber') loanNumber: string) {
    return this.odsLoansService.findOne({ loanNumber });
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.odsLoansService.findAll(paginationDto);
  }

  @Post('create')
  async create(@Body() loan: CreateLoanDto) {
    return this.odsLoansService.create(loan);
  }

  @ApiParam({ name: 'number', description: 'Loan Number' })
  @Put(':number')
  async update(@Param('number') number: string, @Body() loan: UpdateLoanDto) {
    return this.odsLoansService.update(number, loan);
  }

  @ApiParam({ name: 'number', description: 'Loan Number' })
  @Delete(':number')
  async delete(@Param('number') loanNumber: string) {
    return this.odsLoansService.delete(loanNumber);
  }
}
