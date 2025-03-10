import { BASE_URL, httpService } from '~/services/index.ts';
import { CartDetailRequest } from '~/dto';

export const cartService = {
  addToCartDetails: (payload: CartDetailRequest) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/carts', payload);
  },
  addToCartDetailsForGuest: (payload: CartDetailRequest) => {
    return httpService.post(BASE_URL + '/api/carts/guest', payload);
  },
  updateCartDetails: (payload: CartDetailRequest) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/carts', payload);
  },
  updateCartDetailsForGuest: (payload: CartDetailRequest) => {
    return httpService.put(BASE_URL + '/api/carts/guest', payload);
  },
  syncCartDetails: (payload: CartDetailRequest) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/carts', payload);
  },
  syncCartDetailsForGuest: (payload: CartDetailRequest) => {
    return httpService.put(BASE_URL + '/api/carts/guest', payload);
  },
  removeCartDetail: (productSubDetailId: number) => {
    httpService.attachTokenToHeader();
    return httpService.delete(BASE_URL + '/api/carts', { params: { productSubDetailId } });
  },
  removeCartDetailForGuest: (fingerprint: string, productSubDetailId: number) => {
    return httpService.delete(BASE_URL + '/api/carts/guest', {
      params: { fingerprint, productSubDetailId },
    });
  },
};
export default cartService;
