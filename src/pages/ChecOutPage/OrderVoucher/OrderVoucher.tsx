import * as React from 'react';
import { Select } from 'antd';

interface Props {
  // onSelectVoucher: (voucher: IVoucher) => void;
}

const OrderVoucher: React.FC<Props> = () => {
  return (
    <div className="cr-sidebar-wrap cr-checkout-voucher-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Mã giảm giá</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-voucher">
            <form action="#">
              <span className="cr-voucher-select-wrapper">
                <span className="cr-voucher-opt-head">Chọn mã giảm giá</span>
                <Select
                  showSearch
                  className="cr-voucher-select"
                  placeholder="Tìm kiếm và chọn mã giảm giá"
                  // optionFilterProp="label"
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? '')
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? '').toLowerCase())
                  // }
                  options={[]}
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
