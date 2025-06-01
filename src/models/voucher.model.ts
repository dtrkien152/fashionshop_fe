export interface IVoucher {
  id?: number;
  code: string;
  triggerPrice: number;
  discountPercent: number;
  maxDiscountPrice: number;
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
