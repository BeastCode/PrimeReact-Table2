import { useState, useEffect } from 'react';
import { TableState } from '../types/TableState';
import { ColumnDefinition } from '../types/Column';

const TABLE_STATE_KEY = 'productTableState';

const defaultState: TableState = {
  filters: {},
  sortField: null,
  sortOrder: null,
  globalFilter: '',
  visibleColumns: [],
  size: 'normal',
  rows: 5,
  columnOrder: []
};

export function useTableState(columns: ColumnDefinition[]) {
  const [tableState, setTableState] = useState<TableState>(() => {
    const savedState = localStorage.getItem(TABLE_STATE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        ...parsed,
        visibleColumns: parsed.visibleColumns.length > 0 
          ? parsed.visibleColumns 
          : columns.map(col => col.field)
      };
    }
    return {
      ...defaultState,
      visibleColumns: columns.map(col => col.field),
      columnOrder: columns.map(col => col.field)
    };
  });

  useEffect(() => {
    localStorage.setItem(TABLE_STATE_KEY, JSON.stringify(tableState));
  }, [tableState]);

  const updateState = (updates: Partial<TableState>) => {
    setTableState(prev => ({ ...prev, ...updates }));
  };

  return {
    tableState,
    updateState
  };
}