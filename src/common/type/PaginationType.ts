export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginateDtoParams<T> = {
  items: T[];
  paginate: PaginationParams;
  itemCount: number;
};
