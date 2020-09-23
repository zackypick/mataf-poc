import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryMongoService } from './in-memory-mongo.service';

describe('InMemoryMongoService', () => {
  let service: InMemoryMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryMongoService],
    }).compile();

    service = module.get<InMemoryMongoService>(InMemoryMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
