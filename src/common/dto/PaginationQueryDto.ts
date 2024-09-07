import {
  DEFAULT_PAGE,
  DEFAUlt_PAGE_SIZE,
  MAXIMUM_PAGE_SIZE,
  MINIMUM_PAGE_SIZE,
} from '@common/constants/pagination';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(DEFAULT_PAGE)
  public readonly page: number = DEFAULT_PAGE;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(MINIMUM_PAGE_SIZE)
  @Max(MAXIMUM_PAGE_SIZE)
  public readonly pageSize: number = DEFAUlt_PAGE_SIZE;
}
