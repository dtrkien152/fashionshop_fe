// AddressCreateModal.tsx
import React from 'react';
import {Form, Input, Modal} from 'antd';
import userService from '~/services/user.service.ts';
import toast from "react-hot-toast";

interface AddressCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddressCreateModal: React.FC<AddressCreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            await userService.addAddress(values);
            toast.success('Đã thêm địa chỉ mới!');
            onSuccess(); // Gọi hàm onSuccess để refresh dữ liệu
            onClose(); // Đóng modal
            form.resetFields(); // Xóa form sau khi hoàn tất
        } catch (error) {
            toast.error('Lỗi khi thêm địa chỉ!');
        }
    };

    return (
        <Modal
            title="Thêm địa chỉ mới"
            open={isOpen}
            onOk={handleCreate}
            onCancel={onClose}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên địa chỉ"
                    name="addressName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên địa chỉ!' }]}
                >
                    <Input placeholder="Nhập tên địa chỉ" />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ chi tiết"
                    name="fullAddress"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                >
                    <Input placeholder="Nhập địa chỉ chi tiết" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddressCreateModal;
