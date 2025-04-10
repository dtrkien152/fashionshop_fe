import { BASE_URL, httpService } from '~/services/index.ts';

export const siteService = {
  getAllSite: () => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/sites');
  },
};
export default siteService;
