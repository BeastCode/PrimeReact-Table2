import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

interface ColumnFilterMenuProps {
  field: string;
  header: string;
  onFilter: (field: string, matchMode: string) => void;
}

export function ColumnFilterMenu({ field, header, onFilter }: ColumnFilterMenuProps) {
  const menuRef = useRef<Menu>(null);

  const filterModes: MenuItem[] = [
    {
      label: 'Filter Options',
      items: [
        {
          label: 'Equals',
          icon: 'pi pi-fw pi-equals',
          command: () => onFilter(field, 'equals')
        },
        {
          label: 'Contains',
          icon: 'pi pi-fw pi-search',
          command: () => onFilter(field, 'contains')
        },
        {
          label: 'Starts With',
          icon: 'pi pi-fw pi-angle-double-right',
          command: () => onFilter(field, 'startsWith')
        },
        {
          label: 'Ends With',
          icon: 'pi pi-fw pi-angle-double-left',
          command: () => onFilter(field, 'endsWith')
        }
      ]
    },
    {
      label: 'Numeric Filters',
      items: [
        {
          label: 'Greater Than',
          icon: 'pi pi-fw pi-chevron-right',
          command: () => onFilter(field, 'gt')
        },
        {
          label: 'Less Than',
          icon: 'pi pi-fw pi-chevron-left',
          command: () => onFilter(field, 'lt')
        },
        {
          label: 'Between',
          icon: 'pi pi-fw pi-arrows-h',
          command: () => onFilter(field, 'between')
        }
      ]
    }
  ];

  return (
    <div className="inline-flex ml-2">
      <Button
        type="button"
        icon="pi pi-filter"
        className="p-button-rounded p-button-text p-button-sm"
        onClick={(e) => menuRef.current?.toggle(e)}
        aria-label={`Filter ${header}`}
      />
      <Menu model={filterModes} popup ref={menuRef} />
    </div>
  );
}