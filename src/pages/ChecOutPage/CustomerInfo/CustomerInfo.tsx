import * as React from 'react';

interface Props {}

const CustomerInfo: React.FC<Props> = () => {
  return (
    <div className="cr-checkout-wrap mb-30">
      <div className="cr-checkout-block cr-check-new">
        <h3 className="cr-checkout-title">New Customer</h3>
        <div className="cr-check-block-content">
          <div className="cr-check-subtitle">Checkout Options</div>
          <form action="#">
            <span className="cr-new-option">
              <span>
                <input type="radio" id="account1" name="radio-group" checked />
                <label htmlFor="account1">Register Account</label>
              </span>
              <span>
                <input type="radio" id="account2" name="radio-group" />
                <label htmlFor="account2">Guest Account</label>
              </span>
            </span>
          </form>
          <div className="cr-new-desc">
            By creating an account you will be able to shop faster, be up to date on an order's
            status, and keep track of the orders you have previously made.
          </div>
          <span>
            <button className="cr-button mt-30" type="submit">
              Continue
            </button>
          </span>
        </div>
      </div>
      <div className="cr-checkout-block cr-check-login">
        <h3 className="cr-checkout-title">Returning Customer</h3>
        <div className="cr-check-login-form">
          <form action="#" method="post">
            <span className="cr-check-login-wrap">
              <label>Email Address</label>
              <input type="text" name="name" placeholder="Enter your email address" required />
            </span>
            <span className="cr-check-login-wrap">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" required />
            </span>

            <span className="cr-check-login-wrap cr-check-login-btn">
              <button className="cr-button mr-15" type="submit">
                Login
              </button>
              <a className="cr-check-login-fp" href="#">
                Forgot Password?
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomerInfo;
