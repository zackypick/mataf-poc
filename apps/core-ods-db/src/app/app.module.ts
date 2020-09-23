import { Module } from '@nestjs/common';

import { InMemoryMongoService } from '../in-memory-mongo/in-memory-mongo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [InMemoryMongoService],
})
export class AppModule {}
