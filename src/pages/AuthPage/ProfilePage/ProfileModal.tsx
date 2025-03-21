import React, { useState } from 'react';
import { Layout, Menu, message, Modal } from 'antd';
import { HomeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import PersonalInfoTab from '~/pages/AuthPage/ProfilePage/components/PersonalInfoTab.tsx';
import ChangePasswordTab from '~/pages/AuthPage/ProfilePage/components/ChangePasswordTab.tsx';
import AddressManagementTab from '~/pages/AuthPage/ProfilePage/components/AddressManagementTab.tsx';
import { IUserState } from '~/redux';
import { useSelector } from 'react-redux';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

const { Sider, Content } = Layout;

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  defaultActiveKey?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onClose,
  defaultActiveKey = '1',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveKey);

  const userInfo: IUserState = useSelector((state: { auth: IUserState }) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userInfo.avatar || null);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      // Giả sử avatarUrl mới từ response
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj as RcFile));
      message.success('Cập nhật avatar thành công!');
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Bạn chỉ có thể tải lên file hình ảnh!');
    }
    return isImage;
  };
  return (
    <Modal
      className="cr-profile-modal"
      title="Thông tin cá nhân"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      {/*<div style={{ textAlign: 'center', marginBottom: 20 }}>*/}
      {/*    <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />*/}
      {/*    <Upload*/}
      {/*        showUploadList={false}*/}
      {/*        beforeUpload={beforeUpload}*/}
      {/*        onChange={handleAvatarChange}*/}
      {/*    >*/}
      {/*        <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>*/}
      {/*            Thay đổi Avatar*/}
      {/*        </Button>*/}
      {/*    </Upload>*/}
      {/*</div>*/}

      <Layout className="cr-profile-layout" style={{ minHeight: '300px' }}>
        <Sider width={200} theme="light">
          <Menu
            className="cr-profile-layout-menu"
            mode="vertical"
            selectedKeys={[activeTab]}
            onClick={(e) => handleTabChange(e.key)}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Thông tin cá nhân',
              },
              {
                key: '2',
                icon: <LockOutlined />,
                label: 'Đổi mật khẩu',
              },
              {
                key: '3',
                icon: <HomeOutlined />,
                label: 'Quản lý địa chỉ',
              },
            ]}
          />
        </Sider>

        <Content
          className="cr-profile-layout-main"
          style={{ padding: '0 24px', borderRadius: '12px' }}
        >
          {activeTab === '1' && <PersonalInfoTab />}
          {activeTab === '2' && <ChangePasswordTab />}
          {activeTab === '3' && <AddressManagementTab />}
        </Content>
      </Layout>
    </Modal>
  );
};

export default ProfileModal;
