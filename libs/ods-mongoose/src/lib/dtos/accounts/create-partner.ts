import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { AccountPartnerType } from '@mataf-poc/models';

export class CreatePartnerDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public accountNumber: string;

  @ApiProperty({
    name: 'role',
    enum: AccountPartnerType,
  })
  public role: AccountPartnerType;

  @ApiProperty()
  public name: string;
}

export class UpdatePartnerDto extends OmitType(CreatePartnerDto, [
  'id',
  'accountNumber',
]) {}

export class PartialPartnerDto extends PartialType(CreatePartnerDto) {}
