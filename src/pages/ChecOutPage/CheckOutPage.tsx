import {
  AccountInfo,
  BillingSummary,
  CustomerDetails,
  DeliveryMethod,
  OrderSummary,
  OrderVoucher,
  PaymentMethod,
} from '~/pages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { useEffect, useMemo, useState } from 'react';
import { orderService, shipFeeService } from '~/services';
import { IShipFee } from '~/models';
import { OrderCreateRequest, OrderProduct } from '~/dto';
import { PAYMENT_METHOD, PAYMENT_STATUS } from '~/constants';
import { useNavigate } from 'react-router-dom';
import { ValidationUtils } from '~/utils/validation.utils.ts';
import { ROUTER_PATH } from '~/routes';
import { resetCart } from '~/redux';
import toast from 'react-hot-toast';

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<any>({});
  const [accountInfo, setAccountInfo] = useState<{
    accountType: 'USER' | 'GUEST';
    email?: string;
  }>({ accountType: 'USER' });
  const [customerInfo, setCustomerInfo] = useState<{
    fullName?: string;
    phone?: string;
    address?: string;
  }>({});
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD>(PAYMENT_METHOD.COD);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { cartCode } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.cart);

  const totalPrice = useMemo(
    () => products.reduce((acc, cur) => acc + cur.salePrice * cur.unit, 0),
    [products]
  );

  const [shipFee, setShipFee] = useState<IShipFee>();

  useEffect(() => {
    shipFeeService.getFee(totalPrice).then((response) => {
      setShipFee(response.data);
    });
  }, [totalPrice]);

  const onCreateOrder = () => {
    if (!validateOrder()) return;
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
        type: paymentMethod,
        status: PAYMENT_STATUS.PENDING,
      },
      customer: {
        name: customerInfo.fullName as string,
        address: customerInfo.address as string,
        phone: customerInfo.phone as string,
      },
      siteId: 1,
      cartCode,
    };
    const orderRequest =
      accountInfo.accountType === 'USER'
        ? orderService.createMyOrder(payload)
        : orderService.createOrder(payload, accountInfo?.email as string);
    orderRequest.then((response) => {
      switch (paymentMethod) {
        case PAYMENT_METHOD.VNPAY:
          const paymentUrl = response.data.paymentUrl as string;
          window.location.href = paymentUrl;
          break;
        case PAYMENT_METHOD.COD:
          const code = response.data.order.code;
          dispatch(resetCart());
          toast.success(`Đơn hàng ${code} của bạn đã được đặt thành công!`);
          navigate(ROUTER_PATH.orderTracking.extract.replace(':code', code));
          break;
      }
    });
  };

  const validateOrder = () => {
    setError({});
    const validAccount = validateAccount();
    const validCustomer = validateCustomer();
    return validAccount && validCustomer;
  };

  const validateAccount = () => {
    let invalid = true;
    if (accountInfo.accountType === 'USER' && !isLoggedIn) {
      invalid = false;
      setError((error: any) => ({
        ...error,
        account: 'Vui lòng đăng nhập để tạo đơn hàng với tư cách người dùng.',
      }));
    }
    if (accountInfo.accountType === 'GUEST') {
      if (!accountInfo.email) {
        invalid = false;
        setError((error: any) => ({
          ...error,
          account: 'Vui lòng nhập email để có thể tạo đơn hàng',
        }));
      }
      if (accountInfo.email && !ValidationUtils.isValidEmail(accountInfo.email)) {
        invalid = false;
        setError((error: any) => ({
          ...error,
          account: 'Sai định dạng email, vui lòng nhập lại',
        }));
      }
    }
    return invalid;
  };

  const validateCustomer = () => {
    console.log(customerInfo);
    let invalid = true;
    if (!customerInfo.fullName) {
      invalid = false;
      setError((error: any) => ({
        ...error,
        fullName: 'Vui lòng nhập họ và tên',
      }));
    }
    if (!customerInfo.phone) {
      invalid = false;
      setError((error: any) => ({
        ...error,
        phone: 'Vui lòng nhập số điện thoại',
      }));
    }
    if (customerInfo.phone && !ValidationUtils.isValidPhoneNumber(customerInfo.phone)) {
      invalid = false;
      setError((error: any) => ({
        ...error,
        phone: 'Sai định dạng số điện thoại, vui lòng nhập lại',
      }));
    }
    if (!customerInfo.address) {
      invalid = false;
      setError((error: any) => ({
        ...error,
        address: 'Vui lòng nhập địa chỉ',
      }));
    }
    return invalid;
  };

  return (
    <section className="cr-checkout-section padding-tb-100">
      <div className="container">
        <div className="row">
          <div className="cr-checkout-rightside col-lg-4 col-md-12">
            <OrderSummary />
            <OrderVoucher />
            <DeliveryMethod shipFee={shipFee} />
            <BillingSummary
              totalPrice={totalPrice}
              shipFeePrice={shipFee?.fee || 0}
              voucherDiscountPrice={0}
            />
            <PaymentMethod paymentMethod={paymentMethod} onBinding={setPaymentMethod} />
          </div>
          <div className="cr-checkout-leftside col-lg-8 col-md-12 m-t-991">
            <div className="cr-checkout-content">
              <div className="cr-checkout-inner">
                <AccountInfo error={error} setError={setError} onBinding={setAccountInfo} />
                <CustomerDetails error={error} setError={setError} onBinding={setCustomerInfo} />
                <span className="cr-check-order-btn">
                  <a className="cr-button mt-30" onClick={onCreateOrder}>
                    Đặt hàng
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
