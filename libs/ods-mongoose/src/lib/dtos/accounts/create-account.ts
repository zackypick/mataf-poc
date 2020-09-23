import { AccountType } from '@mataf-poc/models';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreatePartnerDto } from './create-partner';
import { CreateSubAccountDto } from './create-sub-account';

export class CreateAccountDto {
  @ApiProperty()
  public number: string;

  @ApiProperty()
  public holder: string;

  @ApiProperty({
    enum: AccountType,
    name: 'type',
  })
  public type: AccountType;

  @ApiProperty()
  public branchNumber: number;

  @ApiProperty()
  public credit: number;

  @ApiProperty({
    description: 'The range of a credit',
    minimum: 1,
    maximum: 8,
  })
  public creditScoreRating: number; // 1 - 8
}

export class UpdateAccountDto extends OmitType(CreateAccountDto, ['number']) {}

export class PopulatedAccountDto extends CreateAccountDto {
  // populated fields
  public partners: CreatePartnerDto[];

  public subAccounts: CreateSubAccountDto[];
}

export class PartialAccountDto extends PartialType(PopulatedAccountDto) {}

export class PopulateAccountFieldsDto {
  @ApiProperty({
    isArray: true,
    description: 'Populates Fields',
    enum: ['partners', 'subAccounts'],
    required: false,
  })
  populate: string[];
}
