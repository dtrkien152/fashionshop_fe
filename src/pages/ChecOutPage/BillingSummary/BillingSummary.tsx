import * as React from 'react';
import { CurrencyUtils } from '~/utils';

interface Props {
  originTotalPrice: number;
  // shipFeePrice: number;
  voucherDiscountPrice: number;
}

const BillingSummary: React.FC<Props> = (props) => {
  return (
    <div className="cr-sidebar-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Tóm tắt đơn hàng</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-summary">
            <div>
              <span className="text-left">Giá sản phẩm</span>
              <span className="text-right">
                {CurrencyUtils.formatCurrencyVND(props.originTotalPrice * 0.9)}
              </span>
            </div>
            <div>
              <span className="text-left">Thuế VAT (10%) </span>
              <span className="text-right">
                {CurrencyUtils.formatCurrencyVND(props.originTotalPrice * 0.1)}
              </span>
            </div>
            {/*<div>*/}
            {/*  <span className="text-left">Phí vận chuyển</span>*/}
            {/*  <span className="text-right">{CurrencyUtils.formatCurrencyVND(props.shipFeePrice)}</span>*/}
            {/*</div>*/}
            <div>
              <span className="text-left">Mã giảm giá</span>
              <span className="text-right">
                {CurrencyUtils.formatCurrencyVND(props.voucherDiscountPrice)}
              </span>
            </div>
            <div className="cr-checkout-summary-total">
              <span className="text-left">Tổng tiền</span>
              <span className="text-right">
                {CurrencyUtils.formatCurrencyVND(
                  props.originTotalPrice - props.voucherDiscountPrice
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillingSummary;
