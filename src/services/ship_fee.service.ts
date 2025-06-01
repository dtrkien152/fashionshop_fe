import { ShipFeeCreateRequest, ShipFeeUpdateRequest } from '~/dto';
import { BASE_URL, httpService } from '~/services/index.ts';

export const shipFeeService = {
  create: (payload: ShipFeeCreateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/ship-fee', payload);
  },
  update: (payload: ShipFeeUpdateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/ship-fee', payload);
  },
  deactivate: (id: number) => {
    httpService.attachTokenToHeader();
    return httpService.delete(BASE_URL + `/api/ship-fee/${id}`);
  },
  getAll: () => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/ship-fee');
  },
  getFee: (wardCode?: string, districtId?: number) => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/ship-fee/calculator', {params: { wardCode, districtId } });
  },
};
export default shipFeeService;
