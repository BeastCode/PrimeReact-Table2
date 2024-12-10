import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface StatusFilterProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];

  return (
    <Dropdown
      value={value}
      options={statuses}
      onChange={(e) => onChange(e.value)}
      className="p-column-filter w-full"
      placeholder="Select Status"
    />
  );
}