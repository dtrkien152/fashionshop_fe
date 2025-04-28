import { OrderCreateRequest, OrderFilter } from '~/dto';
import { BASE_URL, httpService } from '~/services/index.ts';
import { ORDER_STATUS } from '~/constants';

export const orderService = {
  createMyOrder: (payload: OrderCreateRequest) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/orders/my-orders', payload);
  },
  createOrder: (payload: OrderCreateRequest, email: string) => {
    httpService.attachTokenToHeader();
    return httpService.post(BASE_URL + '/api/orders', payload, { params: { email } });
  },
  updateStatusOrder: (code: string, status: ORDER_STATUS) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/orders', null, { params: { code, status } });
  },
  handleCancelOrder: (code: string) => {
    httpService.attachTokenToHeader();
    return httpService.put(BASE_URL + '/api/orders/cancel', null, { params: { code } });
  },
  getAllMyOrders: (params: OrderFilter) => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/orders//my-orders', { params });
  },
  getAllOrders: (params: OrderFilter) => {
    httpService.attachTokenToHeader();
    return httpService.get(BASE_URL + '/api/orders', { params });
  },
  getOrder(code: string) {
    return httpService.get(BASE_URL + `/api/orders/tracking/${code}`);
  },
  buildUrlPayment(orderCode: string) {
    return httpService.get(BASE_URL + `/api/orders/vnpay/build-url`, { params: { orderCode } });
  },
  verifyPayment(query: any) {
    return httpService.get(BASE_URL + `/api/orders/vnpay/results`, { params: query });
  },
};
export default orderService;
