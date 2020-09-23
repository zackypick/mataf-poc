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
import { SubAccountsService } from './sub-accounts.service';
import {
  PaginationDto,
  ParsePaginationPipe,
  PartialSubAccountDto,
  CreateSubAccountDto,
  UpdateSubAccountDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('sub-accounts')
export class SubAccountsController {
  private logger = new Logger(SubAccountsController.name);

  constructor(private readonly subAccountsService: SubAccountsService) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() subAccount: PartialSubAccountDto
  ) {
    return this.subAccountsService.find(subAccount, paginationDto);
  }

  @ApiParam({ name: 'accountNumber', description: 'Sub Account Number' })
  @Get('id/:accountNumber')
  async findById(@Param('accountNumber') accountNumber: string) {
    return this.subAccountsService.findBySubAccountNumber(accountNumber);
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.subAccountsService.findAll(paginationDto);
  }

  @Post('create')
  @ApiQuery({ name: 'accountNumber', description: 'Main Account Number' })
  async create(
    @Query('accountNumber') accountNumber: string,
    @Body() subAccount: CreateSubAccountDto
  ) {
    return this.subAccountsService.create(accountNumber, subAccount);
  }

  @Put(':number')
  @ApiParam({ name: 'number', description: 'Sub Account Number' })
  async update(
    @Param('number') number: string,
    @Body() subAccount: UpdateSubAccountDto
  ) {
    return this.subAccountsService.update(number, subAccount);
  }

  @Delete(':number')
  @ApiQuery({ name: 'accountNumber', description: 'Main Account Number' })
  @ApiParam({ name: 'number', description: 'Sub Account Number' })
  async delete(
    @Query('accountNumber') accountNumber: string,
    @Param('number') number: string
  ) {
    return this.subAccountsService.delete(accountNumber, number);
  }
}
