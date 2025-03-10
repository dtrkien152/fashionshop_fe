import * as React from 'react';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';

interface Props {
  totalPrice: number;
  shipFeePrice: number;
  voucherDiscountPrice: number;
}

const BillingSummary: React.FC<Props> = (props) => {
  return (
    <div className="cr-sidebar-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Summary</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-summary">
            <div>
              <span className="text-left">Sub-Total</span>
              <span className="text-right">{formatCurrencyVND(props.totalPrice * 0.9)}</span>
            </div>
            <div>
              <span className="text-left">VAT (10%): </span>
              <span className="text-right">{formatCurrencyVND(props.totalPrice * 0.1)}</span>
            </div>
            <div>
              <span className="text-left">Delivery Charges</span>
              <span className="text-right">{formatCurrencyVND(props.shipFeePrice)}</span>
            </div>
            <div>
              <span className="text-left">Voucher Charges</span>
              <span className="text-right">{formatCurrencyVND(props.voucherDiscountPrice)}</span>
            </div>
            <div className="cr-checkout-summary-total">
              <span className="text-left">Total Amount</span>
              <span className="text-right">{formatCurrencyVND(props.totalPrice + props.shipFeePrice - props.voucherDiscountPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillingSummary;
