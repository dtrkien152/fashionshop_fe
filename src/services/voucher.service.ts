import { BASE_URL, httpService } from '~/services/index.ts';
import { UserVoucherCreateRequest, VoucherCreateRequest, VoucherUpdateRequest } from '~/dto';

export const voucherService = {
  addVoucher: (payload: VoucherCreateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/vouchers', payload);
  },
  updateVoucher: (payload: VoucherUpdateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/vouchers', payload);
  },
  deactivateVoucher: (id: number) => {
    httpService.attachTokenToHeader();
    return httpService.delete(BASE_URL + `/api/vouchers/${id}`);
  },
  getMyVoucher: () => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/vouchers/my-voucher');
  },
  addMyVoucher: (voucherCode: string) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/vouchers/my-voucher', null, {
      params: { voucherCode },
    });
  },
  getVoucherInUser: (userId: number) => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/vouchers/user', { params: { userId } });
  },
  addVoucherForUsers: (payload: UserVoucherCreateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/vouchers/user', payload);
  },
  deactivateVoucherForUser: (userVoucherId: number) => {
    httpService.attachTokenToHeader();
    return httpService.delete(BASE_URL + `/api/vouchers/user/${userVoucherId}`);
  },
};
export default voucherService;
