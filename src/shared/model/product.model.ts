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
        images: [string, string]; // Ảnh đầu là thumbnailUrl của product, ảnh sau là 1 ảnh của subproduct
    colors: string[]; // Các thuộc tính của subproduct
    size: string[]; // Các thuộc tính của subproduct
}
