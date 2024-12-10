import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface NumberFilterProps {
  field: string;
  value: number | null;
  onChange: (value: number | null) => void;
}

export function NumberFilter({ value, onChange }: NumberFilterProps) {
  return (
    <InputNumber
      value={value}
      onValueChange={(e) => onChange(e.value)}
      mode="currency"
      currency="USD"
      locale="en-US"
      className="p-column-filter w-full"
      placeholder="Search..."
    />
  );
}