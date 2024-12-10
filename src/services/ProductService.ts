import { Product } from '../types/Product';
import { createProductVariant, generateProductBatch } from '../utils/productGenerators';

class ProductServiceClass {
  private lastGeneratedId: number = 0;
  private readonly batchSize: number = 1000;
  private readonly baseProduct: Product = {
    id: 1,
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Eco-friendly bamboo watch with leather strap",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
    sku: "WATCH001",
    brand: "EcoTime",
    manufacturer: "GreenWatch Co.",
    color: "Brown",
    size: "One Size",
    weight: 0.2,
    dimensions: "4x4x2",
    material: "Bamboo, Leather",
    dateAdded: "2024-01-15",
    lastModified: "2024-03-10",
    supplierName: "EcoSupplies Ltd",
    supplierContact: "contact@ecosupplies.com",
    minStockLevel: 10,
    maxStockLevel: 100,
    reorderPoint: 15,
    leadTime: 14,
    unitCost: 32.50,
    profitMargin: 100,
    discountAvailable: true,
    taxRate: 20,
    shelfLocation: "A1-B2",
    barcode: "123456789",
    warrantyPeriod: "2 years",
    certifications: ["FSC", "Fair Trade"],
    countryOfOrigin: "Vietnam",
    customsTariffNumber: "9102.12.80",
    packageType: "Box",
    unitsPerPackage: 1,
    shippingWeight: 0.3,
    shippingClass: "Standard",
    handlingInstructions: "Handle with care",
    safetyStock: 20,
    seasonality: "All Year",
    productLifecycle: "Growth",
    sustainabilityScore: 9.5,
    returnRate: 2.5
  };

  async getProducts(): Promise<Product[]> {
    this.lastGeneratedId = 0;
    const initialProducts = generateProductBatch(this.baseProduct, 1, 25);
    this.lastGeneratedId = initialProducts.length;
    return initialProducts;
  }

  generateMoreProducts(currentProducts: Product[]): Product[] {
    const startId = this.lastGeneratedId + 1;
    const newProducts: Product[] = [];
    const totalBatches = Math.ceil(10000 / this.batchSize);
    
    for (let batch = 0; batch < totalBatches; batch++) {
      const batchStartId = startId + (batch * this.batchSize);
      const batchSize = Math.min(this.batchSize, 10000 - (batch * this.batchSize));
      
      const batchProducts = generateProductBatch(
        this.baseProduct,
        batchStartId,
        batchSize
      );
      
      newProducts.push(...batchProducts);
    }
    
    this.lastGeneratedId += newProducts.length;
    return newProducts;
  }
}

export const ProductService = new ProductServiceClass();