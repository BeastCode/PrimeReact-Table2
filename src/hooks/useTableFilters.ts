import { useState, useCallback } from 'react';
import { Product } from '../types/Product';
import { FilterMetaData } from '../types/FilterMetaData';

export function useTableFilters() {
  const [filters, setFilters] = useState<Record<string, FilterMetaData>>({});

  const onFilterChange = useCallback((field: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: { value, matchMode: 'contains' }
    }));
  }, []);

  const filterData = useCallback((data: Product[]) => {
    return data.filter(item => {
      return Object.entries(filters).every(([field, filter]) => {
        if (!filter.value) return true;

        const itemValue = (item as any)[field];
        
        switch (field) {
          case 'price':
            return itemValue >= filter.value;
          case 'rating':
            return itemValue >= filter.value;
          case 'inventoryStatus':
            return itemValue === filter.value;
          default:
            return String(itemValue)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());
        }
      });
    });
  }, [filters]);

  return {
    filters,
    onFilterChange,
    filterData
  };
}