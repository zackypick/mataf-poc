import { Module, HttpModule } from '@nestjs/common';

import { RiskController } from '../risk/risk.controller';
import { RiskService } from '../risk/risk.service';

@Module({
  imports: [HttpModule],
  controllers: [RiskController],
  providers: [RiskService],
})
export class AppModule {}
