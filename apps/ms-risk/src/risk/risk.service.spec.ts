import { Test } from '@nestjs/testing';

import { RiskService } from './risk.service';

describe('RiskService', () => {
  let service: RiskService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [RiskService],
    }).compile();

    service = app.get<RiskService>(RiskService);
  });
});
