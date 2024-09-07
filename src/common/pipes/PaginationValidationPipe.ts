import { PaginationQueryDto } from '@common/dto/PaginationQueryDto';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export class PaginationTransformPipe implements PipeTransform {
  async transform(dto: PaginationQueryDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }
    return plainToClass(metatype, dto, {
      exposeDefaultValues: true,
    });
  }
}
