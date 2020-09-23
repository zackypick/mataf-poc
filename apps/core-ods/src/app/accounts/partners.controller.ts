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
  PaginationDto,
  ParsePaginationPipe,
  ODSPartnerService,
  CreatePartnerDto,
  UpdatePartnerDto,
  PartialPartnerDto,
  ODSAccountsService,
} from '@mataf-poc/ods-mongoose';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('api')
@Controller('partners')
export class PartnerController {
  private logger = new Logger(PartnerController.name);

  constructor(
    private readonly odsPartnerService: ODSPartnerService,
    private readonly odsAccountsService: ODSAccountsService
  ) {}

  @Post('find')
  @UsePipes(new ParsePaginationPipe())
  async find(
    @Query() paginationDto: PaginationDto,
    @Body() partner: PartialPartnerDto
  ) {
    return this.odsPartnerService.find(partner, paginationDto);
  }

  @ApiParam({ name: 'id', description: 'Partner ID' })
  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return this.odsPartnerService.findOne({ id });
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.odsPartnerService.findAll(paginationDto);
  }

  @Post('create')
  async create(@Body() partner: CreatePartnerDto) {
    const created = await this.odsPartnerService.createOrUpdate(
      partner.id,
      partner.accountNumber,
      partner
    );
    return this.odsAccountsService.update(
      {
        number: partner.accountNumber,
      },
      {
        $addToSet: {
          partners: created._id,
        },
      }
    );
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiQuery({ name: 'accountNumber', description: 'Account Number' })
  async update(
    @Param('id') id: string,
    @Query('accountNumber') accountNumber: string,
    @Body() partner: UpdatePartnerDto
  ) {
    this.odsPartnerService.update(id, accountNumber, partner);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiQuery({ name: 'accountNumber', description: 'Account Number' })
  async delete(
    @Param('id') id: string,
    @Query('accountNumber') accountNumber: string
  ) {
    //delete from partners scheme
    const deleted = await this.odsPartnerService.delete(id, accountNumber);
    // remove from account
    return this.odsAccountsService.update(
      { number: accountNumber },
      {
        $pull: {
          partners: { $in: deleted._id },
        },
      }
    );
  }
}
