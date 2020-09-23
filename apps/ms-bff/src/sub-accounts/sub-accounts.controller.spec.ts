import { Test, TestingModule } from '@nestjs/testing';
import { SubAccountsController } from './sub-accounts.controller';

describe('Sub Accounts Controller', () => {
  let controller: SubAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubAccountsController],
    }).compile();

    controller = module.get<SubAccountsController>(SubAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
