import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { PaginationDto } from '../dtos/paging/paging';

@Injectable()
export class ParsePaginationPipe implements PipeTransform<PaginationDto> {
  async transform(value: PaginationDto, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query' || !value || !value.limit || !value.page) {
      return value;
    }

    const paginationDto: PaginationDto = {
      ...value,
      limit: Number(value.limit),
      page: Number(value.page),
    };
    if (isNaN(paginationDto.limit) || isNaN(paginationDto.page)) {
      throw new BadRequestException(
        'Validation failed - Valid page and limit required'
      );
    }
    return paginationDto;
  }
}
