import {
  AddressDetails,
  BillingSummary,
  CustomerInfo,
  DeliveryMethod,
  OrderSummary,
  PaymentMethod,
} from '~/pages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { useEffect, useMemo, useState } from 'react';
import { orderService, shipFeeService } from '~/services';
import { IShipFee } from '~/models';
import { OrderCreateRequest, OrderProduct } from '~/dto';
import { PAYMENT_STATUS, PAYMENT_TYPE } from '~/constants';
import toast from 'react-hot-toast';
import { resetCart } from '~/shared/reducers/cartReducer.ts';

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart);

  const totalPrice = useMemo(
    () => products.reduce((acc, cur) => acc + cur.salePrice, 0),
    [products]
  );

  const [shipFee, setShipFee] = useState<IShipFee>();

  useEffect(() => {
    shipFeeService.getFee(1500000).then((response) => {
      setShipFee(response.data);
    });
  }, [totalPrice]);

  const onCreateOrder = () => {
    const payload: OrderCreateRequest = {
      products: products.map((p0) => {
        return {
          productId: p0.productId,
          color: p0.color,
          size: p0.size,
          unit: p0.unit,
        } as OrderProduct;
      }),
      payment: {
        type: PAYMENT_TYPE.COD,
        status: PAYMENT_STATUS.PENDING,
      },
      customer: {
        name: 'Nguyen Van Long',
        address: 'Số nhà 9b Ngõ 21 Nguyễn Văn Huyên',
        phone: '0942934219',
      },
      siteId: 1,
    };
    orderService.createOrder(payload, 'longnv.2502.work@gmail.com').then((response) => {
      const code = response.data.code;
      dispatch(resetCart());
      toast.success(
        `Đơn hàng ${code} của bạn đã được đặt thành công! Cảm ơn bạn đã mua sắm cùng chúng tôi. 😊`
      );
    });
  };

  return (
    <section className="cr-checkout-section padding-tb-100">
      <div className="container">
        <div className="row">
          <div className="cr-checkout-rightside col-lg-4 col-md-12">
            <OrderSummary />
            <DeliveryMethod shipFee={shipFee} />
            <BillingSummary
              totalPrice={totalPrice}
              shipFeePrice={shipFee?.fee || 0}
              voucherDiscountPrice={0}
            />
            <PaymentMethod />
          </div>
          <div className="cr-checkout-leftside col-lg-8 col-md-12 m-t-991">
            <div className="cr-checkout-content">
              <div className="cr-checkout-inner">
                <CustomerInfo />
                <AddressDetails />
                <span className="cr-check-order-btn">
                  <a className="cr-button mt-30" onClick={onCreateOrder}>
                    Place Order
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CheckOutPage;
