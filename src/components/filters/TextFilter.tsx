import React from 'react';
import { InputText } from 'primereact/inputtext';

interface TextFilterProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <InputText
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-column-filter w-full"
      placeholder="Search..."
    />
  );
}