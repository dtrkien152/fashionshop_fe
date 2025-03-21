import * as React from 'react';
import { useState } from 'react';
import { Select } from 'antd';

interface Props {
  error: any;
  setError: (error: any) => void;
  onBinding: (data: { fullName?: string; phone?: string; address?: string }) => void;
}

const CustomerDetails: React.FC<Props> = (props) => {
  const [addressType, setAddressType] = useState<'EXIST' | 'NEW'>('EXIST');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onFullNameChange = (value: string) => {
    setFullName(value);
    props.onBinding({ fullName: value, phone, address });
    props.setError((error: any) => ({
      ...error,
      fullName: undefined,
    }));
  };

  const onPhoneChange = (value: string) => {
    setPhone(value);
    props.onBinding({ phone: value, fullName, address });
    props.setError((error: any) => ({
      ...error,
      phone: undefined,
    }));
  };

  const onAddressChange = (value: string) => {
    setAddress(value);
    props.onBinding({ address: value, fullName, phone });
    props.setError((error: any) => ({
      ...error,
      address: undefined,
    }));
  };

  return (
    <div className="cr-checkout-wrap">
      <div className="cr-checkout-block cr-check-bill">
        <h3 className="cr-checkout-title">Address Details</h3>
        <div className="cr-bl-block-content">
          <div className="cr-check-subtitle">Checkout Options</div>
          <span className="cr-bill-option">
            <span>
              <input
                type="radio"
                id="exist-address"
                name="address-options"
                checked={addressType === 'EXIST'}
                onChange={() => setAddressType('EXIST')}
              />
              <label htmlFor="exist-address">I want to use an existing address</label>
            </span>
            <span>
              <input
                type="radio"
                id="new-address"
                name="address-options"
                checked={addressType === 'NEW'}
                onChange={() => setAddressType('NEW')}
              />
              <label htmlFor="new-address">I want to use new address</label>
            </span>
          </span>
          <div className="cr-check-bill-form mb-minus-24">
            <span className="cr-bill-wrap">
              <label className="required">Chọn địa chỉ đã lưu</label>
              <Select
                showSearch
                className="cr-address-select"
                placeholder="Select address to fill"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label:
                      'Nguyễn Văn Long - 0969975700 - Tổ dân phố văn trì, Minh Khai, Bắc Từ Liêm, Hà Nội',
                    disabled: true,
                  },
                ]}
              />
            </span>
            <>
              <span className="cr-bill-wrap">
                <label className="required">Họ và Tên</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Vui lòng nhập họ tên"
                  value={fullName}
                  required
                  onInput={(e: any) => onFullNameChange(e.target.value)}
                />
              </span>
              {props.error.fullName && (
                <div className="error-message" style={{ marginBottom: '16px' }}>
                  {props.error.fullName}
                </div>
              )}
              <span className="cr-bill-wrap">
                <label className="required">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Vui lòng nhập số điện thoại"
                  value={phone}
                  required
                  onInput={(e: any) => onPhoneChange(e.target.value)}
                />
              </span>
              {props.error.phone && (
                <div className="error-message" style={{ marginBottom: '16px' }}>
                  {props.error.phone}
                </div>
              )}
              <span className="cr-bill-wrap">
                <label className="required">Địa chỉ cụ thể</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ cụ thể"
                  value={address}
                  required
                  onInput={(e: any) => onAddressChange(e.target.value)}
                />
              </span>
              {props.error.address && (
                <div className="error-message" style={{ marginBottom: '16px' }}>
                  {props.error.address}
                </div>
              )}
              {/*<span className="cr-bill-wrap cr-bill-half">*/}
              {/*  <label>Tỉnh/Thành Phố</label>*/}
              {/*  <span className="cr-bl-select-inner">*/}
              {/*    <select name="cr_select_city" id="cr-select-city" className="cr-bill-select">*/}
              {/*      <option selected disabled>*/}
              {/*        Tỉnh/Thành Phố*/}
              {/*      </option>*/}
              {/*      <option value="1">City 1</option>*/}
              {/*      <option value="2">City 2</option>*/}
              {/*      <option value="3">City 3</option>*/}
              {/*      <option value="4">City 4</option>*/}
              {/*      <option value="5">City 5</option>*/}
              {/*    </select>*/}
              {/*  </span>*/}
              {/*</span>*/}
              {/*<span className="cr-bill-wrap cr-bill-half">*/}
              {/*  <label>Quận/Huyện</label>*/}
              {/*  <span className="cr-bl-select-inner">*/}
              {/*    <select*/}
              {/*      name="cr_select_country"*/}
              {/*      id="cr-select-country"*/}
              {/*      className="cr-bill-select"*/}
              {/*    >*/}
              {/*      <option selected disabled>*/}
              {/*        Quận/Huyện*/}
              {/*      </option>*/}
              {/*      <option value="1">Country 1</option>*/}
              {/*      <option value="2">Country 2</option>*/}
              {/*      <option value="3">Country 3</option>*/}
              {/*      <option value="4">Country 4</option>*/}
              {/*      <option value="5">Country 5</option>*/}
              {/*    </select>*/}
              {/*  </span>*/}
              {/*</span>*/}
              {/*<span className="cr-bill-wrap cr-bill-half">*/}
              {/*  <label>Phường/Xã</label>*/}
              {/*  <span className="cr-bl-select-inner">*/}
              {/*    <select name="cr_select_state" id="cr-select-state" className="cr-bill-select">*/}
              {/*      <option selected disabled>*/}
              {/*        Phường/Xã*/}
              {/*      </option>*/}
              {/*      <option value="1">Region/State 1</option>*/}
              {/*      <option value="2">Region/State 2</option>*/}
              {/*      <option value="3">Region/State 3</option>*/}
              {/*      <option value="4">Region/State 4</option>*/}
              {/*      <option value="5">Region/State 5</option>*/}
              {/*    </select>*/}
              {/*  </span>*/}
              {/*</span>*/}
              {/*<span className="cr-bill-wrap cr-bill-half">*/}
              {/*  <label>Địa chỉ cụ thể</label>*/}
              {/*  <input type="text" name="address" placeholder="Địa chỉ cụ thể" />*/}
              {/*</span>*/}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetails;
