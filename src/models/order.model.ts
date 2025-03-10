export interface IOrder {
  id?: number;
  siteId?: number;
  code?: string;
  email?: string;
  voucherCode?: string;
  shippedAt?: Date;
  shipFee?: number;
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
  totalPrice?: number;
  paymentType?: string;
  paymentStatus?: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
