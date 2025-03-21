import React, {useState, ChangeEvent, FormEvent} from 'react';
import authService from "~/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import { ValidationUtils } from '~/utils/validation.utils.ts';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState<string>('');

    // Xử lý khi input thay đổi
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''}); // Reset lỗi khi nhập input
        setApiError(''); // Reset lỗi API
    };

    // Xác thực dữ liệu form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email.';
        } else if (!ValidationUtils.isValidEmail(formData.email)) {
            newErrors.email = 'Email không đúng định dạng.';
        }

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

    // Xử lý đăng ký
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault(); // Chặn reload trang khi submit form
        if (!validateForm()) return;
        authService.register(formData.email, formData.password).then(() => {
            alert('Đăng ký thành công! Mã kích hoạt sẽ được gửi đến account');
            navigate('/login');
        }).catch((error) => {
        console.log('error', error);
            setApiError(error.data.message);
        })
    };

    return (
        <section className="section-register padding-tb-100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div
                            className="cr-register"
                            data-aos="fade-up"
                            data-aos-duration="2000"
                            data-aos-delay="400"
                        >
                            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                                <div className="cr-banner">
                                    <h2>Đăng Ký Tài Khoản</h2>
                                </div>
                                <div className="cr-banner-sub-title">
                                    <p>Tạo tài khoản trên hệ thống để
                                        nhận nhiều ưu đãi hơn. </p>
                                </div>
                            </div>

                        <form className="cr-content-form" onSubmit={handleRegister}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="required">Email</label>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="cr-form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && (
                                            <p className="error-text">{errors.email}</p>
                                        )}
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
                                        {errors.password && (
                                            <p className="error-text">{errors.password}</p>
                                        )}
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
                                        {errors.confirmPassword && (
                                            <p className="error-text">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="cr-register-buttons">
                                    <button type="submit" className="cr-button">
                                        Đăng ký
                                    </button>
                                    <a href="/login" className="link">
                                        Đã có tài khoản?
                                    </a>
                                </div>

                                {apiError && (
                                    <p className="error-text api-error">{apiError}</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

</section>
)};

export default RegisterPage;
