export interface CartDetailRequest {
  fingerprint: string;
  products: CartProduct[];
}

export interface CartProduct {
  productId: number;
  productName: string;
  thumbnailUrl:string;
  originalPrice: number;
  salePrice: number;
  color: string;
  size: string;
  unit: number;
}
