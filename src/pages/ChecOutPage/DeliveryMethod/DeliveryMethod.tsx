import * as React from 'react';

interface Props {}

const DeliveryMethod: React.FC<Props> = () => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-del-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Delivery Method</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-del">
            <div className="cr-del-desc">
              Please select the preferred shipping method to use on this order.
            </div>
            <form action="#">
              <span className="cr-del-option">
                <span>
                  <span className="cr-del-opt-head">Free Shipping</span>
                  <input type="radio" id="del1" name="radio-group" checked />
                  <label htmlFor="del1">Rate - $0 .00</label>
                </span>
                <span>
                  <span className="cr-del-opt-head">Flat Rate</span>
                  <input type="radio" id="del2" name="radio-group" />
                  <label htmlFor="del2">Rate - $5.00</label>
                </span>
              </span>
              <span className="cr-del-commemt">
                <span className="cr-del-opt-head">Add Comments About Your Order</span>
                <textarea name="your-commemt" placeholder="Comments"></textarea>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeliveryMethod;
