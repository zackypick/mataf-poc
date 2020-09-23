import { Currency } from '@mataf-poc/models';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateLoanProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  loanCode: number;

  @ApiProperty()
  subAccountTypeCode: number;

  @ApiProperty({
    description: 'The range of a credit score limit',
    minimum: 1,
    maximum: 8,
  })
  creditScoreLimit: number; // 1 - 8

  @ApiProperty()
  maxLoanAmount: number;

  @ApiProperty()
  maxLoanTermMonths: number;

  @ApiProperty({
    enum: Currency,
  })
  currency: Currency;

  @ApiProperty()
  loanRate: number;
}

export class UpdateLoanProductDto extends OmitType(CreateLoanProductDto, [
  'loanCode',
]) {}

export class PartialLoanProductDto extends PartialType(CreateLoanProductDto) {}
