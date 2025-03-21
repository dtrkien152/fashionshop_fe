export interface IProduct {
  id?: number;
  categoryId?: number;
  code?: string;
  name?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  brand?: string;
  originalPrice?: number;
  salePrice?: number;
  description?: string;
  unitOnOrder?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

