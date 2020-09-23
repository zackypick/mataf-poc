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
  CreateSubAccountDto,
  PaginationDto,
  ParsePaginationPipe,
  ODSSubAccountService,
  UpdateSubAccountDto,
  PartialSubAccountDto,
  ODSAccountsService,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('sub-accounts')
export class SubAccountsController {
  private logger = new Logger(SubAccountsController.name);

  constructor(
    private readonly odsSubAccountsService: ODSSubAccountService,
    private readonly odsAccountsService: ODSAccountsService
  ) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() subAccount: PartialSubAccountDto
  ) {
    return this.odsSubAccountsService.find(subAccount, paginationDto);
  }

  @ApiParam({ name: 'number', description: 'Sub-Account Number' })
  @Get('id/:number')
  async findById(@Param('number') subAccountNumber: string) {
    return this.odsSubAccountsService.findOne({ number: subAccountNumber });
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.odsSubAccountsService.findAll(paginationDto);
  }

  @Post('create')
  @ApiQuery({ name: 'accountNumber', description: 'Main Account Number' })
  async create(
    @Query('accountNumber') accountNumber: string,
    @Body() subAccount: CreateSubAccountDto
  ) {
    const created = await this.odsSubAccountsService.createOrUpdate(
      subAccount.number,
      subAccount
    );
    return this.odsAccountsService.update(
      {
        number: accountNumber,
      },
      {
        $addToSet: {
          subAccounts: created._id,
        },
      }
    );
  }

  @Put(':number')
  @ApiParam({ name: 'number', description: 'Sub-Account Number' })
  async update(
    @Param('number') number: string,
    @Body() subAccount: UpdateSubAccountDto
  ) {
    return this.odsSubAccountsService.update(number, subAccount);
  }

  @Delete(':number')
  @ApiQuery({ name: 'accountNumber', description: 'Main Account Number' })
  @ApiParam({ name: 'number', description: 'Sub-Account Number' })
  async delete(
    @Query('accountNumber') accountNumber: string,
    @Param('number') number: string
  ) {
    const deleted = await this.odsSubAccountsService.delete(number);
    // remove from account
    return this.odsAccountsService.update(
      { number: accountNumber },
      {
        $pull: {
          subAccounts: { $in: deleted._id },
        },
      }
    );
  }
}
