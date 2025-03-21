import * as React from 'react';
import { IShipFee } from '~/models';
import { CurrencyUtils } from '~/utils';
import { Select } from 'antd';

interface Props {
  shipFee?: IShipFee;
}

const OrderVoucher: React.FC<Props> = (props) => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-voucher-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Voucher Code</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-voucher">
            {props.shipFee && props.shipFee?.triggerPrice > 0 && (
              <div className="cr-voucher-desc">
                Congratulations! Your order meets the criteria for {props.shipFee?.name} (applies to
                orders over {CurrencyUtils.formatCurrencyVND(props.shipFee?.triggerPrice)}). Enjoy
                your delivery! 🚚🎉
              </div>
            )}
            <form action="#">
              <span className="cr-voucher-select-wrapper">
                <span className="cr-voucher-opt-head">Nhập voucher</span>
                <Select
                  showSearch
                  className="cr-voucher-select"
                  placeholder="Search to Select"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[
                    {
                      value: '1',
                      label: 'VOUEQlk32KEWq3 - Discount 30% - Max 200.000đ',
                      disabled: true,
                    },
                  ]}
                />
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderVoucher;
