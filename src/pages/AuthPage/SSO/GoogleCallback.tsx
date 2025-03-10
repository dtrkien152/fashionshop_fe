// GoogleCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            console.log('Mã xác thực nhận được:', code);
            // Gửi mã code đến backend nếu cần
            navigate('/');
        } else {
            console.error('Không có mã xác thực (code) trong URL.');
        }
    }, [navigate]);

    return <div>Đang xử lý đăng nhập...</div>;
};

