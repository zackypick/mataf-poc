import { Controller, Get, Logger, Query, UsePipes } from '@nestjs/common';

import { GeneratorService } from './generator.service';
import { PaginationDto, ParsePaginationPipe } from '@mataf-poc/ods-mongoose';

@Controller()
export class GeneratorController {
  private logger = new Logger(GeneratorController.name);

  constructor(private readonly appService: GeneratorService) {}

  @Get('generate')
  generate() {
    this.logger.log('Generate');

    return this.appService.generate();
  }

  @Get('list')
  @UsePipes(new ParsePaginationPipe())
  async list(@Query() paginationDto: PaginationDto) {
    return this.appService.findAll(paginationDto);
  }

  @Get('list/loans')
  @UsePipes(new ParsePaginationPipe())
  listLoans(@Query() paginationDto: PaginationDto) {
    return this.appService.findAllLoans(paginationDto);
  }

  @Get('flush')
  flush() {
    return this.appService.flushAll();
  }
}
