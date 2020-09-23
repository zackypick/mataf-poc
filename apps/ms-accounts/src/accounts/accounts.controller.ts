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
import { AccountsService } from './accounts.service';
import {
  CreateAccountDto,
  PaginationDto,
  ParsePaginationPipe,
  PartialAccountDto,
  UpdateAccountDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('accounts')
export class AccountsController {
  private logger = new Logger(AccountsController.name);

  constructor(private readonly accountsService: AccountsService) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Body() account: PartialAccountDto,
    @Query() paginationDto: PaginationDto,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.accountsService.find(account, paginationDto, populateDto);
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @Get('id/:accountNumber')
  async findById(
    @Param('accountNumber') accountNumber: string,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.accountsService.findByAccountNumber(accountNumber, populateDto);
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.accountsService.findAll(paginationDto, populateDto);
  }

  @Post('create')
  async create(@Body() account: CreateAccountDto) {
    return this.accountsService.create(account);
  }

  @ApiParam({ name: 'number', description: 'Account Number' })
  @Put('id/:number')
  async update(
    @Param('number') number: string,
    @Body() account: UpdateAccountDto
  ) {
    return this.accountsService.update(number, account);
  }

  @ApiParam({ name: 'number', description: 'Account Number' })
  @Delete(':number')
  async delete(@Param('number') accountNumber: string) {
    return this.accountsService.delete(accountNumber);
  }
}
