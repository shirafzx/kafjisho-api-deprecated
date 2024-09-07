export function buildQueryPagination(pagination: {
  page: number;
  pageSize: number;
}) {
  return {
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
  };
}
