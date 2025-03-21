import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { ValidationUtils } from '~/utils/validation.utils.ts';
import { authService } from '~/services';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError('');
    };

  const handleSubmit = async () => {
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }

    if (!ValidationUtils.isValidEmail(email)) {
      setError('Email không đúng định dạng.');
      return;
    }

    authService.sendMailForgotPassword(email).then((res) => {
      if (res.data.success) {
        toast.success("Chúng tôi đã gửi yêu cầu cài đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư đến (hoặc thư rác) và làm theo hướng dẫn để đặt lại mật khẩu.");
      }
    });
  }


  return (
    <section className="section-login padding-tb-150">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="cr-forgot"
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
                  <h2>Forgot Password</h2>
                </div>
              </div>

              <form className="cr-content-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="required">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="cr-form-control"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                </div>

                {error && (
                  <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                  </div>
                )}

                <div className="cr-forgot-buttons">
                  <div style={{ display: 'flex' }}>
                    <button
                      type="button"
                      className="cr-button"
                      onClick={handleSubmit}
                      style={{ marginRight: 20, width: 120 }}
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <Link to={ROUTER_PATH.login.extract} className="link">
                    Đăng nhập?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPasswordPage;
