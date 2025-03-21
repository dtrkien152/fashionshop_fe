export const LANGUAGE = {
  en: 'en_US',
  ko: 'ko_KR',
};

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ACTION {
  ACTIVE_USER = 'ACTIVE_USER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum SORT_BY_ENUM {
  NEWEST = 'newest',
  LATEST = 'latest',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPING = 'SHIPPING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  RETURN = 'RETURN',
}

export const ORDER_STATUS_OPTIONS: { label: string; value: ORDER_STATUS }[] = [
  { label: 'Chờ xác nhận', value: ORDER_STATUS.PENDING },
  { label: 'Xác nhận', value: ORDER_STATUS.CONFIRMED },
  { label: 'Hoàn thành', value: ORDER_STATUS.COMPLETED },
  { label: 'Đã huỷ', value: ORDER_STATUS.REJECTED },
  { label: 'Trả hàng', value: ORDER_STATUS.RETURN },
];

export enum PAYMENT_TYPE {
  VNPAY = 'VNPAY',
  COD = 'COD',
}

export enum PAYMENT_STATUS {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
}
