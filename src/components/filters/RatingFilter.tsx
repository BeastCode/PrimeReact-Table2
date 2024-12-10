import React from 'react';
import { Rating } from 'primereact/rating';

interface RatingFilterProps {
  field: string;
  value: number | null;
  onChange: (value: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <Rating
      value={value || 0}
      onChange={(e) => onChange(e.value)}
      cancel
      className="p-column-filter w-full"
    />
  );
}