import { Product } from '../types/Product';
import * as XLSX from 'xlsx';

export const exportToExcel = (products: Product[]) => {
  const worksheet = XLSX.utils.json_to_sheet(products);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  XLSX.writeFile(workbook, 'products.xlsx');
};

export const exportToCSV = (products: Product[]) => {
  const headers = Object.keys(products[0]).join(',');
  const rows = products.map(product => 
    Object.values(product).join(',')
  );
  
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'products.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};