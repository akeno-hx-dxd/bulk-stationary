// lib/types.ts

export interface Pricing {
    quantity: number;
    price: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    image_uris: string[];
    unit: string;
    descriptions: string[];
    pricing: Pricing[];
    brand: string;
    catalogProducts: CatalogProduct[];
    groupProducts: GroupProduct[];
  }
  
  export interface Catalog {
    id: string;
    name: string;
    image_uri: string;
    catalogProducts: CatalogProduct[];
  }
  
  export interface Group {
    id: string;
    name: string;
    groupProducts: GroupProduct[];
  }
  
  export interface CatalogProduct {
    id: string;
    catalogId: string;
    productId: string;
    catalog: Catalog;
    product: Product;
  }
  
  export interface GroupProduct {
    id: string;
    groupId: string;
    productId: string;
    group: Group;
    product: Product;
  }
  