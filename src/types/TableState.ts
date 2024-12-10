export interface TableState {
  filters: Record<string, FilterMetaData>;
  sortField: string | null;
  sortOrder: number | null;
  globalFilter: string;
  visibleColumns: string[];
  size: string;
  rows: number;
  columnOrder: string[];
}

export interface FilterMetaData {
  value: any;
  matchMode: string;
}