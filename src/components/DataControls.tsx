import React from 'react';
import { Button } from 'primereact/button';

interface DataControlsProps {
  rowCount: number;
  onGenerateMore: () => void;
}

export function DataControls({ rowCount, onGenerateMore }: DataControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-700">
        <i className="pi pi-table" />
        <span className="font-medium">
          Total Rows: {rowCount.toLocaleString()}
        </span>
      </div>
      <Button
        icon="pi pi-plus"
        label="Generate 10,000 Rows"
        severity="secondary"
        onClick={onGenerateMore}
        className="p-button-sm"
        tooltip="Add 10,000 more rows of sample data"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );
}