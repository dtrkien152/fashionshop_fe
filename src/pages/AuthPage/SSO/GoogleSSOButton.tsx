import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GoogleSSOButton = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            console.log('Credential:', credentialResponse);
            // Gửi mã thông báo (token) đến backend
            const result = await axios.get('http://localhost:5000/api/auth/google/callback', {
                headers: {
                    Authorization: `Bearer ${credentialResponse.credential}`,
                },
                withCredentials: true,
            });
            console.log('Đăng nhập thành công:', result.data);
            navigate('/'); // Chuyển hướng về trang chủ hoặc trang mong muốn
        } catch (error) {
            console.error('Lỗi đăng nhập Google:', error);
        }
    };

    const handleFailure = () => {
        console.error('Lỗi xác thực Google');
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
        />
    );
};
