import * as React from 'react';
import { useState } from 'react';

interface Props {}

const CustomerInfo: React.FC<Props> = () => {
  const [accountType, setAccountType] = useState<'USER' | 'GUEST'>('USER');

  return (
    <div className="cr-checkout-wrap mb-30">
      <div className="cr-checkout-block cr-check-new">
        <h3 className="cr-checkout-title">New Customer</h3>
        <div className="cr-check-block-content">
          <div className="cr-check-subtitle">Checkout Options</div>
          <span className="cr-new-option">
            <span>
              <input
                type="radio"
                id="user-account"
                name="account-options"
                checked={accountType === 'USER'}
                onChange={() => setAccountType('USER')}
              />
              <label htmlFor="user-account">User Account</label>
            </span>
            <span>
              <input
                type="radio"
                id="guest-account"
                name="account-options"
                checked={accountType === 'GUEST'}
                onChange={() => setAccountType('GUEST')}
              />
              <label htmlFor="guest-account">Guest Account</label>
            </span>
          </span>
          <div className="cr-new-desc">
            By login an account you will be able to shop faster, be up to date on an order's status,
            and keep track of the orders you have previously made.
          </div>
        </div>
      </div>
      <div className="cr-checkout-block cr-check-login">
        <div className="cr-check-login-form">
          {accountType === 'USER' && (
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
              </span>
            </form>
          )}
          {accountType === 'GUEST' && (
            <form action="#" method="post">
              <span className="cr-check-login-wrap">
                <label>Email Address</label>
                <input type="text" name="name" placeholder="Enter your email address" required />
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerInfo;
