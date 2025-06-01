import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '~/services';
import toast from 'react-hot-toast';
import { ROUTER_PATH } from '~/routes';

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

const ForgotPasswordPageChangePassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string>('');

  useEffect(() => {
    setFormData({
      ...formData,
      code: params.get('code'),
      email: params.get('email'),
    });
  }, [params]);

  // Xử lý khi input thay đổi
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Reset lỗi khi nhập input
    setApiError(''); // Reset lỗi API
  };

  // Xác thực dữ liệu form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải tối thiểu 8 ký tự.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    authService
      .resetForgotPassword(formData.email, formData.code, formData.password)
      .then((res) => {
        if (res.data.success) {
          toast.success('Đặt lại mật khẩu thành công');
          navigate(ROUTER_PATH.login.extract);
        }
      });
  };

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
                    value={formData.email}
                    readOnly={true}
                  />
                </div>

                <div className="form-group">
                  <label className="required">Mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="cr-form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="form-group">
                  <label className="required">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className="cr-form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>

                <div className="cr-forgot-buttons">
                  <button
                    type="button"
                    className="cr-button"
                    onClick={handleSubmit}
                    style={{ marginRight: 0, width: '100%' }}
                  >
                    Đặt lại mật khẩu
                  </button>
                </div>

                {apiError && <p className="error-text api-error">{apiError}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPasswordPageChangePassword;
