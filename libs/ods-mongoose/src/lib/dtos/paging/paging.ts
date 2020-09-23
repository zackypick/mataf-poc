import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    minimum: 1,
  })
  page: number;
  @ApiProperty({
    minimum: 1,
    maximum: 1000,
  })
  limit: number;
}
