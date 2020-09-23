import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { SubAccountType } from '@mataf-poc/models';
import { CreateSubAccountBalancesDto } from './create-sub-account-balances';

export class CreateSubAccountDto {
  @ApiProperty()
  public number: string;

  @ApiProperty()
  public code: number;

  @ApiProperty({
    name: 'type',
    enum: ['saving', 'checking', 'loans'],
  })
  public type: SubAccountType;

  @ApiProperty()
  public balances: CreateSubAccountBalancesDto;
}

export class UpdateSubAccountDto extends OmitType(CreateSubAccountDto, [
  'number',
]) {}

export class PartialSubAccountDto extends PartialType(CreateSubAccountDto) {}
