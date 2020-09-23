import { LoanStatus, Currency } from '@mataf-poc/models';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  loanNumber: string;

  @ApiProperty()
  amount: number;
  @ApiProperty({
    name: 'status',
    enum: LoanStatus,
  })
  status: LoanStatus;

  @ApiProperty()
  code: number;

  @ApiProperty()
  dateTaken: number;

  @ApiProperty()
  dateClosed: number;

  @ApiProperty()
  hasDefaulted: boolean;

  @ApiProperty()
  monthlyPayment: number;

  @ApiProperty()
  lastMonthlyPayment: number;

  @ApiProperty()
  loanTermMonths: number;

  @ApiProperty({
    name: 'currency',
    enum: Currency,
  })
  currency: Currency;
}

export class UpdateLoanDto extends OmitType(CreateLoanDto, ['loanNumber']) {}

export class PartialLoanDto extends PartialType(CreateLoanDto) {}
