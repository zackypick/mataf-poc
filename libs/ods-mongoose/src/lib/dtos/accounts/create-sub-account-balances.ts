import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@mataf-poc/models';

export class CreateSubAccountBalancesDto {
  @ApiProperty()
  public valueDate: number;

  @ApiProperty({
    name: 'type',
    enum: Currency,
  })
  public currency: Currency;

  @ApiProperty()
  public withdrawalBalance: number;

  @ApiProperty()
  public closingBalance: number;

  @ApiProperty()
  public currentBalance: number;
}
