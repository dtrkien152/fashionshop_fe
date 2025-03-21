import { Button } from 'antd';
import { FcGoogle } from 'react-icons/fc'; // Hoặc sử dụng button mặc định tùy giao diện bạn muốn giữ

const GoogleSSOButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Gọi trực tiếp API Google SSO của backend
      window.location.href = 'http://localhost:5000/api/auth/google';
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error);
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleGoogleLogin}
      style={{
        backgroundColor: '#4285F4',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: 'none',
        height: 40,
        flex: 1,
        marginRight: 0
      }}
    >
      <FcGoogle size={20} /> {/* Logo Google */}
      Đăng nhập với Google
    </Button>
  );
};

export default GoogleSSOButton;
