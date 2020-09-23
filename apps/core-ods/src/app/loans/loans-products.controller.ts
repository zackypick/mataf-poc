import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  PartialLoanDto,
  ODSLoanProductsService,
  CreateLoanProductDto,
  UpdateLoanProductDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('loans/products')
export class LoanProductsController {
  private logger = new Logger(LoanProductsController.name);

  constructor(
    private readonly odsLoanProductsService: ODSLoanProductsService
  ) {}

  @Post('find')
  async find(@Body() loanProduct: PartialLoanDto) {
    return this.odsLoanProductsService.find(loanProduct);
  }

  @Get('list')
  async findAll() {
    return this.odsLoanProductsService.findAll();
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Get('id/:code')
  async findById(@Param('code') code: number) {
    return this.odsLoanProductsService.findOne({ loanCode: code });
  }

  @Post('create')
  async create(@Body() loanProduct: CreateLoanProductDto) {
    return this.odsLoanProductsService.createOrUpdate(
      loanProduct.loanCode,
      loanProduct
    );
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Put(':code')
  async update(
    @Param('code') code: number,
    @Body() loan: UpdateLoanProductDto
  ) {
    return this.odsLoanProductsService.update(code, loan);
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Delete(':code')
  async delete(@Param('code') code: number) {
    return this.odsLoanProductsService.delete(code);
  }
}
