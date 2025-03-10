import * as React from 'react';
import { useState } from 'react';
import { authService } from '~/services';
import { login } from '~/redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import toast from 'react-hot-toast';

interface Props {
  error: any;
  setError: (error: any) => void;
  onBinding: (data: { accountType: 'USER' | 'GUEST'; email?: string }) => void;
}

const AccountInfo: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState<'USER' | 'GUEST'>('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const onLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      props.setError((error: any) => ({
        ...error,
        account: 'Vui lòng đăng nhập để tạo đơn hàng với tư cách người dùng.',
      }));
      return;
    }

    if (!emailRegex.test(email)) {
      props.setError((error: any) => ({
        ...error,
        account: 'Sai định dạng email, vui lòng nhập lại',
      }));
      return;
    }

    try {
      const response = await authService.login(email, password);
      dispatch(login(response.data));

      toast.success('Đăng nhập thành công');
      props.setError((error: any) => ({
        ...error,
        account: undefined,
      }));
    } catch (reason) {
      console.log(reason);
      toast.error('Đăng nhập thất bại');
      props.setError((error: any) => ({
        ...error,
        account: 'Sai thông tin email hoặc mật khẩu, xin mời nhập lại',
      }));
    }
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
    props.onBinding({ accountType, email: value });
    props.setError((error: any) => ({
      ...error,
      account: undefined,
    }));
  }

  const onPasswordChange = (value: string) => {
    setPassword(value);
    props.setError((error: any) => ({
      ...error,
      account: undefined,
    }));
  }

  const onChangeActionType = (type: 'USER' | 'GUEST') => {
    props.onBinding({ accountType: type });
    setAccountType(type);
    props.setError((error: any) => ({
      ...error,
      account: undefined,
    }));
    setEmail('');
    setPassword('');
  };

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
                onChange={() => onChangeActionType('USER')}
              />
              <label htmlFor="user-account">User Account</label>
            </span>
            <span>
              <input
                type="radio"
                id="guest-account"
                name="account-options"
                checked={accountType === 'GUEST'}
                onChange={() => onChangeActionType('GUEST')}
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
            <>
              {!isLoggedIn && (
                <>
                  <span className="cr-check-login-wrap">
                    <label className="required">Email Address</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => onEmailChange(e.target.value)}
                    />
                  </span>
                  <span className="cr-check-login-wrap">
                    <label className="required">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => onPasswordChange(e.target.value)}
                    />
                  </span>

                  {props.error.account && <div className="error-message">{props.error.account}</div>}

                  <span className="cr-check-login-wrap cr-check-login-btn">
                    <button
                      className="cr-button mr-15"
                      type="button"
                      role="button"
                      onClick={onLogin}
                    >
                      Login
                    </button>
                  </span>
                </>
              )}
            </>
          )}
          {accountType === 'GUEST' && (
            <>
              <span className="cr-check-login-wrap">
                <label className="required">Email Address</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your email address"
                  required
                  onChange={(e) => onEmailChange(e.target.value)}
                />
              </span>
              {props.error.account && <div className="error-message">{props.error.account}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
