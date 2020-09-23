import { Test } from '@nestjs/testing';

import { GeneratorService } from './generator.service';

describe('GeneratorService', () => {
  let service: GeneratorService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GeneratorService],
    }).compile();

    service = app.get<GeneratorService>(GeneratorService);
  });

  describe('getData', () => {
    it('should return "Welcome to core-ods-data-generator!"', () => {
      expect(service.generate()).toEqual({
        message: 'Welcome to core-ods-data-generator!',
      });
    });
  });
});
