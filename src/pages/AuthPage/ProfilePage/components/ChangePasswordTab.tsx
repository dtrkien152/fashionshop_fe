import React from 'react';
import { Button, Form, Input } from 'antd';

const ChangePasswordTab: React.FC = () => {
    const [form] = Form.useForm();

    const handleChangePassword = () => {
        form.validateFields().then(values => {
            console.log('Đổi mật khẩu:', values);
        });
    };

    return (
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
                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới' }]}
            >
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>
            <Button type="primary" onClick={handleChangePassword} block>
                Đổi mật khẩu
            </Button>
        </Form>
    );
};

export default ChangePasswordTab;
