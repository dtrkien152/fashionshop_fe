import * as React from 'react';

interface Props {}

const BillingDetails: React.FC<Props> = () => {
  return (
    <div className="cr-checkout-wrap">
      <div className="cr-checkout-block cr-check-bill">
        <h3 className="cr-checkout-title">Billing Details</h3>
        <div className="cr-bl-block-content">
          <div className="cr-check-subtitle">Checkout Options</div>
          <span className="cr-bill-option">
            <span>
              <input type="radio" id="bill1" name="radio-group" />
              <label htmlFor="bill1">I want to use an existing address</label>
            </span>
            <span>
              <input type="radio" id="bill2" name="radio-group" checked />
              <label htmlFor="bill2">I want to use new address</label>
            </span>
          </span>
          <div className="cr-check-bill-form mb-minus-24">
            <form action="#" method="post">
              <span className="cr-bill-wrap cr-bill-half">
                <label>First Name*</label>
                <input type="text" name="firstname" placeholder="Enter your first name" required />
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Last Name*</label>
                <input type="text" name="lastname" placeholder="Enter your last name" required />
              </span>
              <span className="cr-bill-wrap">
                <label>Address</label>
                <input type="text" name="address" placeholder="Address Line 1" />
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>City *</label>
                <span className="cr-bl-select-inner">
                  <select name="cr_select_city" id="cr-select-city" className="cr-bill-select">
                    <option selected disabled>
                      City
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
                <label>Post Code</label>
                <input type="text" name="postalcode" placeholder="Post Code" />
              </span>
              <span className="cr-bill-wrap cr-bill-half">
                <label>Country *</label>
                <span className="cr-bl-select-inner">
                  <select
                    name="cr_select_country"
                    id="cr-select-country"
                    className="cr-bill-select"
                  >
                    <option selected disabled>
                      Country
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
                <label>Region State</label>
                <span className="cr-bl-select-inner">
                  <select name="cr_select_state" id="cr-select-state" className="cr-bill-select">
                    <option selected disabled>
                      Region/State
                    </option>
                    <option value="1">Region/State 1</option>
                    <option value="2">Region/State 2</option>
                    <option value="3">Region/State 3</option>
                    <option value="4">Region/State 4</option>
                    <option value="5">Region/State 5</option>
                  </select>
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillingDetails;
