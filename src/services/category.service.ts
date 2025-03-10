import { BASE_URL, httpService } from '~/services/index.ts';

export const categoryService = {
  getAll: async () => {
    httpService.attachTokenToHeader();
    return await httpService.get(BASE_URL + '/api/categories/getAll');
  },
};
export default categoryService;
