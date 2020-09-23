import { Test, TestingModule } from '@nestjs/testing';
import { LoanProductsController } from './loans-products.controller';

describe('Loans Products Controller', () => {
  let controller: LoanProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanProductsController],
    }).compile();

    controller = module.get<LoanProductsController>(LoanProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
