import React from 'react';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Product } from '../../types/Product';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value}%`;
};

export const priceBodyTemplate = (rowData: Product) => {
  return formatCurrency(rowData.price);
};

export const unitCostBodyTemplate = (rowData: Product) => {
  return formatCurrency(rowData.unitCost);
};

export const profitMarginBodyTemplate = (rowData: Product) => {
  return formatPercentage(rowData.profitMargin);
};

export const ratingBodyTemplate = (rowData: Product) => {
  return <Rating value={rowData.rating} readOnly cancel={false} />;
};

export const statusBodyTemplate = (rowData: Product) => {
  const getSeverity = (status: string) => {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  };
  return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData.inventoryStatus)} />;
};

export const discountBodyTemplate = (rowData: Product) => {
  return <Tag value={rowData.discountAvailable ? 'Yes' : 'No'} 
              severity={rowData.discountAvailable ? 'success' : 'danger'} />;
};

export const sustainabilityBodyTemplate = (rowData: Product) => {
  const score = rowData.sustainabilityScore;
  let severity = 'danger';
  if (score >= 7) severity = 'success';
  else if (score >= 4) severity = 'warning';
  return <Tag value={`${score}/10`} severity={severity} />;
};

export const returnRateBodyTemplate = (rowData: Product) => {
  const rate = rowData.returnRate;
  let severity = 'success';
  if (rate >= 10) severity = 'danger';
  else if (rate >= 5) severity = 'warning';
  return <Tag value={`${rate}%`} severity={severity} />;
};