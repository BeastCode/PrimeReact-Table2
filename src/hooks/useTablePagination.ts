import { useState } from 'react';

interface PaginationState {
  rows: number;
  first: number;
}

const DEFAULT_ROWS = 5;

export function useTablePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    rows: DEFAULT_ROWS,
    first: 0
  });

  const onPageChange = (first: number, rows: number) => {
    setPagination({ first, rows });
  };

  return {
    pagination,
    onPageChange
  };
}