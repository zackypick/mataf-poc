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
import { PartnersService } from './partners.service';
import {
  PaginationDto,
  ParsePaginationPipe,
  CreatePartnerDto,
  UpdatePartnerDto,
  PartialPartnerDto,
  PopulateAccountFieldsDto,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';

@ApiTags('api')
@Controller('partners')
export class PartnersController {
  private logger = new Logger(PartnersController.name);

  constructor(
    private readonly partnersService: PartnersService,
    private readonly accountService: AccountsService
  ) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() partner: PartialPartnerDto
  ) {
    return this.partnersService.find(partner, paginationDto);
  }

  @Get('id/:id')
  @ApiParam({ name: 'id', description: 'Partner ID' })
  async findById(@Param('id') id: string) {
    return this.partnersService.findById(id);
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.partnersService.findAll(paginationDto);
  }

  @Post('create')
  async create(@Body() partner: CreatePartnerDto) {
    return this.partnersService.create(partner);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiQuery({ name: 'accountNumber', description: 'Account Number' })
  async update(
    @Param('id') id: string,
    @Query('accountNumber') accountNumber: string,
    @Body() partner: UpdatePartnerDto
  ) {
    return this.partnersService.update(id, accountNumber, partner);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiQuery({ name: 'accountNumber', description: 'Account Number' })
  async delete(
    @Param('id') id: string,
    @Query('accountNumber') accountNumber: string
  ) {
    return this.partnersService.delete(id, accountNumber);
  }

  @Get('id/:id/accounts')
  @UsePipes(new ParsePaginationPipe())
  async getPartnerAccounts(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
    @Query() populateDto?: PopulateAccountFieldsDto
  ) {
    const partnersRes = await (
      await this.partnersService.find({ id }, paginationDto)
    ).toPromise();

    return this.accountService.find(
      { number: { $in: partnersRes.docs.map((p) => p.accountNumber) } },
      paginationDto,
      populateDto
    );
  }
}
