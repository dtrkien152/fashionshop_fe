import * as React from 'react';
import { IShipFee } from '~/models';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';

interface Props {
  shipFee?: IShipFee;
}

const DeliveryMethod: React.FC<Props> = (props) => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-del-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Delivery Method</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-del">
            <div className="cr-del-desc">
              Congratulations! Your order meets the criteria for {props.shipFee?.name} (applies to
              orders over {formatCurrencyVND(props.shipFee?.triggerPrice || 0)}). Enjoy your delivery! 🚚🎉
            </div>
            <form action="#">
              <span className="cr-del-option">
                <span>
                  <span className="cr-del-opt-head">Normal Shipping</span>
                  <input type="radio" id="normal-ship" name="delivery-options" checked />
                  <label htmlFor="normal-ship">Rate - ${props.shipFee?.fee}</label>
                </span>
                {/*<span>*/}
                {/*  <span className="cr-del-opt-head">Express Rate</span>*/}
                {/*  <input type="radio" id="express-ship" name="delivery-options" />*/}
                {/*  <label htmlFor="express-ship">Rate - $5.00</label>*/}
                {/*</span>*/}
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
