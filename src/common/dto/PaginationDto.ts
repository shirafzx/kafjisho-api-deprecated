import { PaginationDtoParams } from '@common/type/PaginationType';

export class PaginationDto<T = unknown> {
  readonly items: T[];
  readonly page: number;
  readonly pageSize: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
  readonly hasPagination: boolean;

  constructor({ items, pagination, itemCount }: PaginationDtoParams<T>) {
    this.items = items;
    this.page = pagination.page;
    this.pageSize = pagination.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    this.hasPagination = this.itemCount > this.pageSize;
  }
}
