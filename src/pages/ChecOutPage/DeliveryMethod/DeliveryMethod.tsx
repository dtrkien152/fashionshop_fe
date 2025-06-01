import * as React from 'react';
import { IShipFee } from '~/models';
import { CurrencyUtils } from '~/utils';

interface Props {
  shipFee?: IShipFee;
}

const DeliveryMethod: React.FC<Props> = (props) => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-del-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Phương thức vận chuyển</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-del">
            {props.shipFee && props.shipFee?.triggerPrice > 0 && (
              <div className="cr-del-desc">
                Chúc mừng! Đơn hàng của bạn đủ điều kiện để áp dụng {props.shipFee?.name} (áp dụng
                cho đơn hàng từ {CurrencyUtils.formatCurrencyVND(props.shipFee?.triggerPrice)} trở
                lên). Chúc bạn có một trải nghiệm giao hàng tuyệt vời! 🚚😊
              </div>
            )}
            <form action="#">
              <span className="cr-del-option">
                <span>
                  <span className="cr-del-opt-head">Giao hàng tiêu chuẩn</span>
                  <input type="radio" id="normal-ship" name="delivery-options" checked />
                  <label htmlFor="normal-ship">
                    {props.shipFee?.name} - {CurrencyUtils.formatCurrencyVND(props.shipFee?.fee)}
                  </label>
                </span>
                {/*<span>*/}
                {/*  <span className="cr-del-opt-head">Express Rate</span>*/}
                {/*  <input type="radio" id="express-ship" name="delivery-options" />*/}
                {/*  <label htmlFor="express-ship">Rate - $5.00</label>*/}
                {/*</span>*/}
              </span>
              <span className="cr-del-commemt">
                <span className="cr-del-opt-head">Thêm ghi chú cho đơn hàng của bạn</span>
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
