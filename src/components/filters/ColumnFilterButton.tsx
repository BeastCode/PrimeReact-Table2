import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { ColumnDefinition } from '../../types/Column';

interface ColumnFilterButtonProps {
  columns: ColumnDefinition[];
  visibleColumns: ColumnDefinition[];
  onToggleColumn: (field: string) => void;
}

export function ColumnFilterButton({ columns, visibleColumns, onToggleColumn }: ColumnFilterButtonProps) {
  const menuRef = useRef<Menu>(null);
  
  const items: MenuItem[] = columns.map(col => ({
    label: col.header,
    icon: visibleColumns.some(vc => vc.field === col.field) ? 'pi pi-check' : undefined,
    command: () => onToggleColumn(col.field)
  }));

  return (
    <div className="relative">
      <Button
        type="button"
        icon="pi pi-filter"
        label="Columns"
        severity="secondary"
        onClick={(e) => menuRef.current?.toggle(e)}
        className="p-button-sm"
      />
      <Menu
        model={items}
        ref={menuRef}
        popup
        className="w-48"
      />
    </div>
  );
}