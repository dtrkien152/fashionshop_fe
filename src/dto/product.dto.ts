import { SORT_BY_ENUM } from '~/constants';

export interface IProductItemResponse {
  id: number;
  category: string;
  productName: string;
  salePrice: number;
  originalPrice: number;
  description: string;
  unitOnOrder: string;
  branch: string;
  flag: {
    type: 'sale' | 'new' | 'hot';
    value: string;
  };
  thumbnailUrl: string;
  imageUrls: [string, string]; // Ảnh đầu là thumbnailUrl của product, ảnh sau là 1 ảnh của subproduct
  colors: string[]; // Các thuộc tính của subproduct
  size: string[]; // Các thuộc tính của subproduct
}

export interface IProductSearchParam {
  keyword?: string | null;
  categoryId?: number | null;
  sortBy?: SORT_BY_ENUM;
  limit?: number | 10;
  page?: number | 0;
}

export interface IProductSubDetailResponse {
  id: number;
  size: string;
  color: string;
  isActive: boolean;
  unitInStocks: any;
}

export interface IProductDetailResponse {
  productId: number;
  productName: string;
  description: string;
  thumbnailUrl: string;
  imageUrls?: string[];
  categoryId: number;
  salePrice: number;
  originalPrice: number;
  categoryName: string;
  unitOnOrder: number;
  productSubDetails: IProductSubDetailResponse[] | [];
}
