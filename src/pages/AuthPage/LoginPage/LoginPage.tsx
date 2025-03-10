import React, { useState } from 'react';
import { login } from '~/shared/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { authService } from '~/services';
import {GoogleSSOButton} from "~/pages/AuthPage/SSO/GoogleSSOButton.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError('Vui lòng nhập email và password');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Sai định dạng email,vui lòng nhập lại');
      return;
    }

    try {
      const response = await authService.login(email, password);
      dispatch(login(response.data));

      alert('Đăng nhập thành công');
      window.location.href = '/';
      setError('');
    } catch (reason) {
      console.log(reason);
      setError('Sai thông tin email hoặc mật khẩu, xin mời nhập lại');
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError('');
    };

  return (
    <section className="section-login padding-tb-150">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
                className="cr-login"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="400"
            >
              <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                <div className="cr-banner">
                  <h2>Đăng nhập</h2>
                </div>
              </div>

              <form className="cr-content-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="cr-form-control"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                  />
                </div>
                <div className="form-group">
                  <label>Password*</label>
                  <input
                      type="password"
                      placeholder="Enter Your Password"
                      className="cr-form-control"
                      value={password}
                      onChange={handleInputChange(setPassword)}
                  />
                </div>

                {error && (
                    <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
                      {error}
                    </div>
                )}

                <div className="remember">
                  <span className="form-group custom">
                    <input type="checkbox" id="rememberMe"/>
                    <label htmlFor="rememberMe">Remember Me</label>
                  </span>
                  <a className="link" href="forgot.html">
                    Quên mật khẩu?
                  </a>
                </div>

                <br/>

                <div className="login-buttons">
                  <button type="button" className="cr-button" onClick={handleLogin}>
                    Đăng nhập
                  </button>
                  {/*<p>Hoặc đăng nhập với:</p>*/}
                  {/*/!*<GoogleSSOButton/>*!/*/}
                  {/*<GoogleOAuthProvider*/}
                  {/*    clientId="630518824425-deg6kk43dfitd19bqppghedatmjr5beg.apps.googleusercontent.com">*/}
                  {/*  <GoogleSSOButton/>*/}
                  {/*</GoogleOAuthProvider>*/}
                  <a href="/register" className="link">
                    Đăng ký?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
