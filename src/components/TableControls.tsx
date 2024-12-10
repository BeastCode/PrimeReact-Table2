import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { ColumnDefinition } from '../types/Column';
import { ColumnFilterButton } from './filters/ColumnFilterButton';

interface TableControlsProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  size: string;
  onSizeChange: (size: string) => void;
  columns: ColumnDefinition[];
  visibleColumns: ColumnDefinition[];
  onColumnsChange: (columns: ColumnDefinition[]) => void;
  freezeFirstRow: boolean;
  onFreezeFirstRowChange: (freeze: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TableControls({
  globalFilter,
  onGlobalFilterChange,
  size,
  onSizeChange,
  columns,
  visibleColumns,
  onColumnsChange,
  freezeFirstRow,
  onFreezeFirstRowChange,
  onClearFilters,
  hasActiveFilters
}: TableControlsProps) {
  const sizes = [
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' }
  ];

  const handleToggleColumn = (field: string) => {
    const isVisible = visibleColumns.some(col => col.field === field);
    const newColumns = isVisible
      ? visibleColumns.filter(col => col.field !== field)
      : [...visibleColumns, columns.find(col => col.field === field)!];
    onColumnsChange(newColumns);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Global Search..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="p-inputtext-sm"
        />
      </span>
      <Dropdown
        value={size}
        options={sizes}
        onChange={(e) => onSizeChange(e.value)}
        placeholder="Select Size"
        className="w-32"
      />
      <ColumnFilterButton
        columns={columns}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
      />
      <ToggleButton
        checked={freezeFirstRow}
        onChange={(e) => onFreezeFirstRowChange(e.value)}
        onLabel="Unfreeze First Row"
        offLabel="Freeze First Row"
        className="w-36"
      />
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear Filters"
        severity="danger"
        onClick={onClearFilters}
        className="p-button-sm"
        disabled={!hasActiveFilters}
      />
    </div>
  );
}