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
  CreateAccountDto,
  PaginationDto,
  ParsePaginationPipe,
  ODSAccountsService,
  UpdateAccountDto,
  PartialAccountDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('accounts')
export class AccountsController {
  private logger = new Logger(AccountsController.name);

  constructor(private readonly odsAccountsService: ODSAccountsService) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Body() account: PartialAccountDto,
    @Query() paginationDto: PaginationDto,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.odsAccountsService.find(account, {
      ...paginationDto,
      populate: populateDto.populate,
    });
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @Get('id/:accountNumber')
  async findById(
    @Param('accountNumber') accountNumber: string,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.odsAccountsService.findOne(
      { number: accountNumber },
      populateDto.populate
    );
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    return this.odsAccountsService.findAll({
      ...paginationDto,
      populate: populateDto.populate,
    });
  }

  @Post('create')
  async create(@Body() account: CreateAccountDto) {
    return this.odsAccountsService.create(account);
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @Put(':accountNumber')
  async update(
    @Param('accountNumber') accountNumber: string,
    @Body() account: UpdateAccountDto
  ) {
    return this.odsAccountsService.update({ number: accountNumber }, account);
  }

  @ApiParam({ name: 'accountNumber', description: 'Account Number' })
  @Delete(':accountNumber')
  async delete(@Param('accountNumber') accountNumber: string) {
    return this.odsAccountsService.delete(accountNumber);
  }
}
