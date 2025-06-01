import { BASE_URL, httpService } from '~/services/index.ts';
import { CartDetailRequest } from '~/dto';

export const cartService = {
  getCart: (fingerprint: string) => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/carts/info', { params: { fingerprint } });
  },
  getCartForGuest: (fingerprint: string) => {
    return httpService.get(BASE_URL + '/api/carts/info/guest', { params: { fingerprint } });
  },
  getCartDetails: (cartCode: string) => {
    return httpService.get(BASE_URL + '/api/carts', {params: { cartCode } });
  },
  addToCartDetails: (payload: CartDetailRequest) => {
    return httpService.post(BASE_URL + '/api/carts', payload);
  },
  updateToCartDetails: (payload: CartDetailRequest) => {
    return httpService.put(BASE_URL + '/api/carts', payload);
  },
  syncCartDetails: (payload: CartDetailRequest) => {
    return httpService.post(BASE_URL + '/api/carts/sync', payload);
  },
  removeCartDetail: (cartCode: string, productId: number, color: string, size: string) => {
    return httpService.delete(BASE_URL + '/api/carts', { params: { cartCode, productId, color, size } });
  },
};
export default cartService;
