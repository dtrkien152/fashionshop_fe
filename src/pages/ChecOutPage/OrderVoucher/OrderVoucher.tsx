import * as React from 'react';
import { Popover, Select } from 'antd';
import { IVoucher } from '~/models';
import { RootState } from '~/redux';
import { useSelector } from 'react-redux';
import { CurrencyUtils } from '~/utils';
import { useEffect, useState } from 'react';

interface Props {
  originTotalPrice: number;
  onSelectVoucher: (voucher?: IVoucher) => void;
}

const OrderVoucher: React.FC<Props> = (props) => {
  const { vouchers } = useSelector((state: RootState) => state.voucher);
  const [voucherSelected, setVoucherSelected] = useState<IVoucher | null>(null);

  useEffect(() => {
    if (!voucherSelected) {
      props.onSelectVoucher();
      return;
    }
    if (voucherSelected.triggerPrice > props.originTotalPrice) {
      props.onSelectVoucher();
      return;
    }
    props.onSelectVoucher(voucherSelected);
  }, [voucherSelected]);

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
                  optionFilterProp="label"
                  allowClear={true}
                  onSelect={(_, option) => {
                    setVoucherSelected(option.voucher);
                  }}
                  onClear={() => {
                    setVoucherSelected(null);
                  }}
                >
                  {vouchers.map((userVoucher, index) => (
                    <Select.Option
                      key={index}
                      value={userVoucher.voucher.code}
                      disabled={userVoucher.isUsed}
                      voucher={userVoucher.voucher}
                    >
                      <Popover
                        placement="top"
                        title={<span>{userVoucher.voucher.code}</span>}
                        content={
                          <div>
                            <p>Giảm giá: {userVoucher.voucher.discountPercent} %</p>
                            <p>
                              Giá kích hoạt:{' '}
                              {CurrencyUtils.formatCurrencyVND(userVoucher.voucher.triggerPrice)}
                            </p>
                            <p>
                              Giảm giá tối đa:{' '}
                              {CurrencyUtils.formatCurrencyVND(
                                userVoucher.voucher.maxDiscountPrice
                              )}
                            </p>
                            {userVoucher.voucher.isUsed && <p>Đã sửa dụng</p>}
                          </div>
                        }
                      >
                        <p>{userVoucher.voucher.code}</p>
                      </Popover>
                    </Select.Option>
                  ))}
                </Select>
                {voucherSelected && voucherSelected.triggerPrice > props.originTotalPrice && (
                  <span className="cr-voucher-opt-invalid">
                    Giá trị đơn hàng chưa đủ điều kiện kích hoạt (Giá trị tối thiểu{' '}
                    {CurrencyUtils.formatCurrencyVND(voucherSelected.triggerPrice)})
                  </span>
                )}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderVoucher;
