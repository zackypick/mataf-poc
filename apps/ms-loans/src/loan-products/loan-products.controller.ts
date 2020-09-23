import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { LoanProductsService } from './loan-products.service';
import {
  PartialLoanProductDto,
  CreateLoanProductDto,
  UpdateLoanProductDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('loans/products')
export class LoanProductsController {
  private logger = new Logger(LoanProductsController.name);

  constructor(private readonly loanProductService: LoanProductsService) {}

  @Post('find')
  async find(@Body() loan: PartialLoanProductDto) {
    return this.loanProductService.find(loan);
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Get('id/:code')
  async findById(@Param('code') code: number) {
    return this.loanProductService.findByProductCode(code);
  }

  @Get('list')
  async findAll() {
    this.logger.log('Get loan products');

    return this.loanProductService.findAll();
  }

  @Post('create')
  async create(@Body() loan: CreateLoanProductDto) {
    return this.loanProductService.create(loan);
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Put(':code')
  async update(
    @Param('code') code: number,
    @Body() loan: UpdateLoanProductDto
  ) {
    return this.loanProductService.update(code, loan);
  }

  @ApiParam({ name: 'code', description: 'Loan Product Code' })
  @Delete(':code')
  async delete(@Param('code') code: number) {
    return this.loanProductService.delete(code);
  }
}
