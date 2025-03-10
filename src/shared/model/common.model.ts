export interface IProductFilterParams
{
    keyword?: string;
    categoryId?: number;
    sortBy?: SORT_BY_ENUM;
    limit?: number;
    page?: number;
}

export enum SORT_BY_ENUM {
    NEWEST = 'newest',
    LATEST = 'latest',
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc'
}

export enum ORDER_STATUS {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
}

export enum PAYMENT_STATUS {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
}
