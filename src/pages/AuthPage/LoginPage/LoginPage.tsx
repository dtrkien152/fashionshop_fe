import React, { useEffect, useState } from 'react';
import { login, logout } from '~/redux';
import { useDispatch } from 'react-redux';
import { authService } from '~/services';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSSOButton from '~/pages/AuthPage/SSO/GoogleSSOButton.tsx';
import { ROUTER_PATH } from '~/routes';
import { ValidationUtils } from '~/utils/validation.utils.ts';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy token từ URL (khi redirect từ backend)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      authService
        .getUserAuth(token)
        .then((response) => {
          const userData = response.data.data;
          dispatch(logout());
          // Dispatch dữ liệu vào Redux store
          dispatch(
            login({
              ...userData,
              token: token,
            })
          );
          alert('Đăng nhập thành công');
          // Chuyển hướng về dashboard hoặc trang chính
          navigate('/');
        })
        .catch((error) => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
          // navigate('/login');
        });
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {

    if (!email || !password) {
      setError('Vui lòng nhập email và password');
      return;
    }

    if (!ValidationUtils.isValidEmail(email)) {
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
              <div
                className="mb-30"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="400"
              >
                <div className="cr-banner">
                  <h2>Đăng nhập</h2>
                </div>
              </div>

              <form className="cr-content-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="required">Địa chỉ email</label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    className="cr-form-control"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                </div>
                <div className="form-group">
                  <label className="required">Mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="cr-form-control"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
                </div>

                {error && (
                  <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                  </div>
                )}

                <div className="remember">
                  <span className="form-group custom">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Ghi nhớ phiên đăng nhập</label>
                  </span>
                  <Link className="link" to={ROUTER_PATH.forgotPassword.extract}>
                    Quên mật khẩu?
                  </Link>
                </div>

                <br />

                <div className="login-buttons">
                  <div style={{ display: 'flex', width: '100%' }}>
                    <button
                      type="button"
                      className="cr-button"
                      onClick={handleLogin}
                      style={{ marginRight: 20, width: 120 }}
                    >
                      Đăng nhập
                    </button>
                    {/*<p>Hoặc đăng nhập với:</p>*/}
                    {/*<GoogleSSOButton/>*/}
                    <GoogleSSOButton />
                  </div>
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
