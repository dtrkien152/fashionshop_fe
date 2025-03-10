import { SORT_BY_ENUM } from '~/shared/model/common.model.ts';

export interface IProductItemResponse {
  id: number;
  category: string;
  productName: string;
  salePrice: string;
  originalPrice: string;
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
  keyword?:string|null,
  categoryId?:number|null,
  sortBy?:SORT_BY_ENUM|SORT_BY_ENUM.NEWEST,
  limit?: number|10,
  page?:number|0
}
export interface IProductSubDetailResponse {
  id: number;
  size: string;
  color: string;
  isActive: boolean;
  totalQuantity: number;
}

export interface IProductDetailResponse {
  product_id: number;
  productName: string;
  description:string;
  thumbnailUrl:string;
  imageUrls?: string[];
  category_id: number;
  category_name: string;
  unitOnOrder: number;
  productSubDetails: IProductSubDetailResponse[]|[];
}
