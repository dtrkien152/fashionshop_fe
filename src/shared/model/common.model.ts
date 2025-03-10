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