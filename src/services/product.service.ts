import { BASE_URL, httpService } from '~/services/index.ts';
import { IProductSearchParam, OrderProductReview } from '~/dto';
import { SORT_BY_ENUM } from '~/constants';

const productService = {
  getArrival: () => {
    httpService.attachTokenToHeader();
    const model = {
      keyword: null,
      categoryId: null,
      sortBy: SORT_BY_ENUM.NEWEST,
      limit: 10,
      page: 0,
    };
    return httpService.post(BASE_URL + '/api/products/search', model);
  },
  getTopSelling: async (categoryIds: number[] | null) => {
    httpService.attachTokenToHeader();
    const query = categoryIds ? `?categoryIds=${categoryIds.join(',')}` : '';
    return await httpService.get(BASE_URL + '/api/products/top-selling'+query);
  },
  search: async (model: IProductSearchParam) => {
    httpService.attachTokenToHeader();
    return await httpService.post(BASE_URL + '/api/products/search', model);
  },
  getProductDetail: async (id: string) => {
    httpService.attachTokenToHeader();
    return await httpService.get(BASE_URL + `/api/products/detail?productId=${id}`);
  },
  getRecommendProduct: async (productId: number) => {
    httpService.attachTokenToHeader();
    return await httpService.get(`${BASE_URL}/api/products/recommended`, {
      params: { productId },
    });
  },
  getReviewProduct(productId: string, page: number, limit: number) {
    return httpService.get(BASE_URL + `/api/products/review`, {
      params: { productId, page, limit },
    });
  },
  addReviewProduct(payload: OrderProductReview) {
    return httpService.post(BASE_URL + `/api/products/review`, payload);
  },
  editReviewProduct(payload: IProductSearchParam) {
    return httpService.put(BASE_URL + `/api/products/review`, payload);
  },

  getArrivalByCategory: (categoryId:any) => {
    httpService.attachTokenToHeader();
    const model = {
      keyword: null,
      categoryId,
      sortBy: SORT_BY_ENUM.NEWEST,
      limit: 6,
      page: 0,
    };
    return httpService.post(BASE_URL + '/api/products/search', model);
  },
};

export default productService;
