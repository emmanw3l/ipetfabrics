export type ProductCategory = 'fabric' | 'clothing';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // stored in Naira, whole numbers
  imageUrl: string;
  category: ProductCategory;
  inStock: boolean;
  createdAt: number;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt'>;
