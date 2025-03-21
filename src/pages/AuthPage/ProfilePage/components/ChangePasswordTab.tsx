import React from 'react';
import { Button, Form, Input } from 'antd';
import { ChangePasswordWrapper } from '~/pages/AuthPage/ProfilePage/components/style.ts';
import { authService } from '~/services';
import toast from 'react-hot-toast';

const ChangePasswordTab: React.FC = () => {
  const [form] = Form.useForm();

  const handleChangePassword = () => {
    form.validateFields().then((values) => {
      authService.changePassword(values.oldPassword, values.newPassword).then((res) => {
        if (res.data.success) {
          toast.success('Đổi mật khẩu thành công!');
          form.resetFields();
        }
      });
    });
  };

  return (
    <ChangePasswordWrapper>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
            {
              validator: async (_, value) => {
                if (value && value !== form.getFieldValue('newPassword')) {
                  return Promise.reject(new Error('Vui lòng xác nhận mật khẩu mới chính xác'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
        <Button type="primary" onClick={handleChangePassword} block>
          Đổi mật khẩu
        </Button>
      </Form>
    </ChangePasswordWrapper>
  );
};

export default ChangePasswordTab;
