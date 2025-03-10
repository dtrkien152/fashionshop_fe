import * as React from 'react';

interface Props {}

const AddressDetails: React.FC<Props> = () => {
  // const [addressType, setAddressType] = useState<'EXIST' | 'NEW'>('EXIST');

  return (
    <div className="cr-checkout-wrap">
      <div className="cr-checkout-block cr-check-bill">
        <h3 className="cr-checkout-title">Address Details</h3>
        <div className="cr-bl-block-content">
          {/*<div className="cr-check-subtitle">Checkout Options</div>*/}
          {/*<span className="cr-bill-option">*/}
          {/*  <span>*/}
          {/*    <input*/}
          {/*      type="radio"*/}
          {/*      id="exist-address"*/}
          {/*      name="address-options"*/}
          {/*      checked={addressType === 'EXIST'}*/}
          {/*      onChange={() => setAddressType('EXIST')}*/}
          {/*    />*/}
          {/*    <label htmlFor="exist-address">I want to use an existing address</label>*/}
          {/*  </span>*/}
          {/*  <span>*/}
          {/*    <input*/}
          {/*      type="radio"*/}
          {/*      id="new-address"*/}
          {/*      name="address-options"*/}
          {/*      checked={addressType === 'NEW'}*/}
          {/*      onChange={() => setAddressType('NEW')}*/}
          {/*    />*/}
          {/*    <label htmlFor="new-address">I want to use new address</label>*/}
          {/*  </span>*/}
          {/*</span>*/}
          <div className="cr-check-bill-form mb-minus-24">
            <form action="#" method="post">
              <span className="cr-bill-wrap">
                <label>Họ và Tên</label>
                <input type="text" name="fullname" placeholder="Vui lòng nhập họ tên" required />
              </span>
              <span className="cr-bill-wrap">
                <label>Số điện thoại</label>
                <input type="text" name="phone" placeholder="Vui lòng nhập số điện thoại" required />
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Tỉnh/Thành Phố</label>
                <span className="cr-bl-select-inner">
                  <select name="cr_select_city" id="cr-select-city" className="cr-bill-select">
                    <option selected disabled>
                      Tỉnh/Thành Phố
                    </option>
                    <option value="1">City 1</option>
                    <option value="2">City 2</option>
                    <option value="3">City 3</option>
                    <option value="4">City 4</option>
                    <option value="5">City 5</option>
                  </select>
                </span>
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Quận/Huyện</label>
                <span className="cr-bl-select-inner">
                  <select
                    name="cr_select_country"
                    id="cr-select-country"
                    className="cr-bill-select"
                  >
                    <option selected disabled>
                      Quận/Huyện
                    </option>
                    <option value="1">Country 1</option>
                    <option value="2">Country 2</option>
                    <option value="3">Country 3</option>
                    <option value="4">Country 4</option>
                    <option value="5">Country 5</option>
                  </select>
                </span>
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Phường/Xã</label>
                <span className="cr-bl-select-inner">
                  <select name="cr_select_state" id="cr-select-state" className="cr-bill-select">
                    <option selected disabled>
                      Phường/Xã
                    </option>
                    <option value="1">Region/State 1</option>
                    <option value="2">Region/State 2</option>
                    <option value="3">Region/State 3</option>
                    <option value="4">Region/State 4</option>
                    <option value="5">Region/State 5</option>
                  </select>
                </span>
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Địa chỉ cụ thể</label>
                <input type="text" name="postalcode" placeholder="Địa chỉ cụ thể" />
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressDetails;
