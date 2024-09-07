export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginationDtoParams<T> = {
  items: T[];
  pagination: PaginationParams;
  itemCount: number;
};
