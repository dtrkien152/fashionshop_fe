import { BASE_URL, httpService } from '~/services/index.ts';
import { SORT_BY_ENUM } from '~/shared/model/common.model.ts';
import { IProductSearchParam } from '~/shared/model/product.model.ts';

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
  getTopSelling: async () => {
    httpService.attachTokenToHeader();
    return await httpService.get(BASE_URL + '/api/products/top-selling');
  },
  search: async (model: IProductSearchParam) => {
    httpService.attachTokenToHeader();
    return await httpService.post(BASE_URL + '/api/products/search', model);
  }
};


export default productService;
