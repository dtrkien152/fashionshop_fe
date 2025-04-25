import { SORT_BY_ENUM } from '~/constants';
import { IProductSubDetailReview } from '~/models';

export interface IProductItemResponse {
  id: number;
  category: string;
  productName: string;
  salePrice: number;
  originalPrice: number;
  description: string;
  unitOnOrder: string;
  branch: string;
  avgRating: number;
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
  brand?: string;
  gender?: string;
  weight?: string;
  other_info?: string;
  totalAvailable?: number;
  originalPrice: number;
  categoryName: string;
  unitOnOrder: number;
  averageRating?: number;
  category_name?: string;
  productSubDetails: IProductSubDetailResponse[] | [];
}

export interface IProductSubDetailReviewDto extends IProductSubDetailReview{
  customerName?: number;
}
