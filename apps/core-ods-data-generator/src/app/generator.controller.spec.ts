import { Test, TestingModule } from '@nestjs/testing';

import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';

describe('GeneratorController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GeneratorController],
      providers: [GeneratorService],
    }).compile();
  });
});
