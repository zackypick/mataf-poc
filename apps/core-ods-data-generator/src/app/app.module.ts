import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { OdsMongoModule } from '@mataf-poc/ods-mongoose';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost/nest`), OdsMongoModule],
  controllers: [GeneratorController],
  providers: [GeneratorService],
})
export class AppModule {}
