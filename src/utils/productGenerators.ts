import { Product } from '../types/Product';

export const generateRandomValue = {
  price: (basePrice: number) => {
    const multiplier = Math.random() * 2 + 0.5;
    return Math.round(basePrice * multiplier);
  },
  
  quantity: () => Math.floor(Math.random() * 100),
  
  rating: () => Math.max(1, Math.min(5, Math.floor(Math.random() * 6))),
  
  status: () => ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'][Math.floor(Math.random() * 3)],
  
  date: () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    return date.toISOString().split('T')[0];
  },
  
  sustainability: () => Math.round((Math.random() * 5 + 5) * 10) / 10,
  
  returnRate: () => Math.round(Math.random() * 100) / 10,
  
  stock: {
    min: () => Math.floor(Math.random() * 20) + 5,
    max: () => Math.floor(Math.random() * 150) + 50
  },
  
  weight: (baseWeight: number) => {
    const multiplier = Math.random() * 2 + 0.5;
    return Math.round(baseWeight * multiplier * 100) / 100;
  }
};

export const createProductVariant = (baseProduct: Product, id: number): Product => {
  return {
    ...baseProduct,
    id,
    code: `${baseProduct.code}-${id}`,
    name: `${baseProduct.name} ${id}`,
    price: generateRandomValue.price(baseProduct.price),
    quantity: generateRandomValue.quantity(),
    rating: generateRandomValue.rating(),
    inventoryStatus: generateRandomValue.status(),
    dateAdded: generateRandomValue.date(),
    sustainabilityScore: generateRandomValue.sustainability(),
    returnRate: generateRandomValue.returnRate(),
    unitCost: generateRandomValue.price(baseProduct.unitCost),
    minStockLevel: generateRandomValue.stock.min(),
    maxStockLevel: generateRandomValue.stock.max(),
    weight: generateRandomValue.weight(baseProduct.weight)
  };
};

export const generateProductBatch = (
  baseProduct: Product,
  startId: number,
  batchSize: number
): Product[] => {
  return Array.from({ length: batchSize }, (_, index) => 
    createProductVariant(baseProduct, startId + index)
  );
};