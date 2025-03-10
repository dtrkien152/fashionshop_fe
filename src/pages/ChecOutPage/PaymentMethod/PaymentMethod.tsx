import * as React from 'react';

interface Props {}

const PaymentMethod: React.FC<Props> = () => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-pay-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Payment Method</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-pay">
            <div className="cr-pay-desc">
              Please select the preferred payment method to use on this order.
            </div>
            <form action="#" className="payment-options">
              <span className="cr-pay-option">
                <span>
                  <input type="radio" id="pay1" name="payment-options" checked />
                  <label htmlFor="pay1">Cash On Delivery</label>
                </span>
              </span>
              <span className="cr-pay-option">
                <span>
                  <input type="radio" id="pay2" name="payment-options" />
                  <label htmlFor="pay2">VN-PAY</label>
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
