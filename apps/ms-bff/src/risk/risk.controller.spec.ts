import { Test, TestingModule } from '@nestjs/testing';
import { RiskController } from './risk.controller';

describe('Risk Controller', () => {
  let controller: RiskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskController],
    }).compile();

    controller = module.get<RiskController>(RiskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
