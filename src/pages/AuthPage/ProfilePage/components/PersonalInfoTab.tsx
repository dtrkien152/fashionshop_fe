import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { IUserState, login } from '~/redux';
import AvatarUpload from './AvatarUpload';
import userService from "~/services/user.service.ts";
import toast from 'react-hot-toast';

const PersonalInfoTab: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo: IUserState = useSelector((state: { auth: IUserState }) => state.auth);

    const [form] = Form.useForm();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(userInfo.avatar || null);

    useEffect(() => {
        form.setFieldsValue({
            fullName: userInfo.fullName,
            email: userInfo.email,
            phone: userInfo.phone
        });
        setAvatarUrl(userInfo.avatar || null);
    }, [userInfo, form]);

    const handleFormSubmit = (values: Partial<IUserState>) => {
        console.log('data ', values);

        userService.updateProfile(values.fullName as string, values.phone as string)
            .then(() => {
                const updatedUserInfo = {
                    ...userInfo,
                    ...values,
                    avatar: avatarUrl,
                };
                dispatch(login(updatedUserInfo));
                toast.success('Cập nhật thông tin cá nhân thành công!');
            })
            .catch(() => {
                toast.error('Cập nhật thông tin cá nhân thất bại!');
            });
    };

    const handleAvatarChange = (url: string | null) => {
        setAvatarUrl(url);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
                fullName: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone
            }}
        >
            <AvatarUpload avatarUrl={avatarUrl} onAvatarChange={handleAvatarChange} />

            <Form.Item
                label="Họ và Tên"
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
                <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không đúng định dạng!' },
                ]}
            >
                <Input placeholder="Nhập email" disabled />
            </Form.Item>

            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^\d{10,11}$/, message: 'Số điện thoại không đúng định dạng!' },
                ]}
            >
                <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Cập nhật thông tin
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PersonalInfoTab;
