import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectionChangeEvent, DataTableSortEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/ProductService';
import { Product } from '../types/Product';
import { ColumnDefinition } from '../types/Column';
import { TableControls } from './TableControls';
import { TextFilter } from './filters/TextFilter';
import { NumberFilter } from './filters/NumberFilter';
import { StatusFilter } from './filters/StatusFilter';
import { RatingFilter } from './filters/RatingFilter';
import { ExportButtons } from './ExportButtons';
import { DataControls } from './DataControls';
import { useTableState } from '../hooks/useTableState';
import { productColumns } from '../config/columnDefinitions';
import { ColumnFilterMenu } from './filters/ColumnFilterMenu';
import {
  priceBodyTemplate,
  unitCostBodyTemplate,
  profitMarginBodyTemplate,
  ratingBodyTemplate,
  statusBodyTemplate,
  discountBodyTemplate,
  sustainabilityBodyTemplate,
  returnRateBodyTemplate
} from './templates/TableTemplates';

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [frozenValue, setFrozenValue] = useState<Product[]>([]);
  const [freezeFirstRow, setFreezeFirstRow] = useState(false);
  
  const { tableState, updateState } = useTableState(productColumns);
  
  const visibleColumns = productColumns.filter(col => 
    tableState.visibleColumns.includes(col.field)
  );

  const hasActiveFilters = Object.keys(tableState.filters).length > 0 || tableState.globalFilter !== '';

  useEffect(() => {
    ProductService.getProducts().then(data => {
      setProducts(data);
      if (freezeFirstRow && data.length > 0) {
        setFrozenValue([data[0]]);
      }
    });
  }, [freezeFirstRow]);

  const handleGenerateMore = () => {
    const newProducts = ProductService.generateMoreProducts(products);
    setProducts(prevProducts => [...prevProducts, ...newProducts]);
  };

  const onRowSelect = (event: DataTableSelectionChangeEvent) => {
    const selectedRow = event.data as Product;
    setFrozenValue([...frozenValue, selectedRow]);
  };

  const onRowUnselect = (event: DataTableSelectionChangeEvent) => {
    const unselectedRow = event.data as Product;
    setFrozenValue(frozenValue.filter(row => row.id !== unselectedRow.id));
  };

  const onSort = (event: DataTableSortEvent) => {
    updateState({
      sortField: event.sortField,
      sortOrder: event.sortOrder
    });
  };

  const onFilter = (field: string, value: any, matchMode: string = 'contains') => {
    updateState({
      filters: {
        ...tableState.filters,
        [field]: { value, matchMode }
      }
    });
  };

  const onClearFilters = () => {
    updateState({
      filters: {},
      globalFilter: ''
    });
  };

  const getTableSize = () => {
    switch (tableState.size) {
      case 'small':
        return 'p-datatable-sm';
      case 'large':
        return 'p-datatable-lg';
      default:
        return '';
    }
  };

  const renderHeader = (col: ColumnDefinition) => {
    return (
      <div className="flex items-center justify-between">
        <span>{col.header}</span>
        <ColumnFilterMenu
          field={col.field}
          header={col.header}
          onFilter={(field, matchMode) => onFilter(field, tableState.filters[field]?.value || '', matchMode)}
        />
      </div>
    );
  };

  const renderFilter = (field: string) => {
    const value = tableState.filters[field]?.value;
    
    switch (field) {
      case 'price':
      case 'unitCost':
      case 'weight':
      case 'shippingWeight':
        return <NumberFilter field={field} value={value} onChange={(val) => onFilter(field, val)} />;
      case 'rating':
        return <RatingFilter field={field} value={value} onChange={(val) => onFilter(field, val)} />;
      case 'inventoryStatus':
        return <StatusFilter field={field} value={value} onChange={(val) => onFilter(field, val)} />;
      default:
        return <TextFilter field={field} value={value || ''} onChange={(val) => onFilter(field, val)} />;
    }
  };

  const renderColumn = (col: ColumnDefinition) => {
    const commonProps = {
      field: col.field,
      header: renderHeader(col),
      sortable: true,
      style: { width: col.width },
      filter: true,
      filterElement: () => renderFilter(col.field),
      showFilterMenu: false
    };

    switch (col.field) {
      case 'price':
      case 'unitCost':
        return <Column key={col.field} {...commonProps} body={priceBodyTemplate} />;
      case 'profitMargin':
        return <Column key={col.field} {...commonProps} body={profitMarginBodyTemplate} />;
      case 'rating':
        return <Column key={col.field} {...commonProps} body={ratingBodyTemplate} />;
      case 'inventoryStatus':
        return <Column key={col.field} {...commonProps} body={statusBodyTemplate} />;
      case 'discountAvailable':
        return <Column key={col.field} {...commonProps} body={discountBodyTemplate} />;
      case 'sustainabilityScore':
        return <Column key={col.field} {...commonProps} body={sustainabilityBodyTemplate} />;
      case 'returnRate':
        return <Column key={col.field} {...commonProps} body={returnRateBodyTemplate} />;
      default:
        return <Column key={col.field} {...commonProps} />;
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <TableControls
            globalFilter={tableState.globalFilter}
            onGlobalFilterChange={(value) => updateState({ globalFilter: value })}
            size={tableState.size}
            onSizeChange={(size) => updateState({ size })}
            columns={productColumns}
            visibleColumns={visibleColumns}
            onColumnsChange={(cols) => updateState({ 
              visibleColumns: cols.map(col => col.field) 
            })}
            freezeFirstRow={freezeFirstRow}
            onFreezeFirstRowChange={setFreezeFirstRow}
            onClearFilters={onClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <ExportButtons data={products} />
        </div>
        <DataControls
          rowCount={products.length}
          onGenerateMore={handleGenerateMore}
        />
      </div>
      
      <DataTable
        value={products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        scrollable
        scrollHeight="600px"
        virtualScrollerOptions={{ itemSize: 46 }}
        tableStyle={{ minWidth: '150rem' }}
        globalFilter={tableState.globalFilter}
        filters={tableState.filters}
        sortField={tableState.sortField}
        sortOrder={tableState.sortOrder}
        onSort={onSort}
        emptyMessage="No products found."
        className={getTableSize()}
        reorderableColumns
        resizableColumns
        showGridlines
        frozenValue={frozenValue}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        filterDisplay="row"
        removableSort
      >
        <Column selectionMode="multiple" frozen headerStyle={{ width: '3rem' }} />
        {visibleColumns.map(renderColumn)}
      </DataTable>
    </div>
  );
}