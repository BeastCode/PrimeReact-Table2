import React from 'react';
import { Button } from 'primereact/button';
import { Product } from '../types/Product';
import { exportToExcel, exportToCSV } from '../utils/exportUtils';

interface ExportButtonsProps {
  data: Product[];
}

export function ExportButtons({ data }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        onClick={() => exportToExcel(data)}
        tooltip="Export to Excel"
      />
      <Button
        type="button"
        icon="pi pi-file"
        severity="info"
        onClick={() => exportToCSV(data)}
        tooltip="Export to CSV"
      />
    </div>
  );
}