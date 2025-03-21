import * as React from 'react';

interface Props {}

const PaymentMethod: React.FC<Props> = () => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-pay-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Phương thức thanh toán</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-pay">
            <div className="cr-pay-desc">
              Vui lòng chọn phương thức thanh toán mà bạn muốn sử dụng cho đơn hàng này.
            </div>
            <form action="#" className="payment-options">
              <span className="cr-pay-option">
                <span>
                  <input type="radio" id="pay1" name="payment-options" checked />
                  <label htmlFor="pay1">Thanh toán khi nhận hàng</label>
                </span>
              </span>
              <span className="cr-pay-option">
                <span>
                  <input type="radio" id="pay2" name="payment-options" disabled />
                  <label htmlFor="pay2">Chuyển khoản VN-PAY</label>
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentMethod;
