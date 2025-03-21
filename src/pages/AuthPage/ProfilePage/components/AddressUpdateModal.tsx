import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import userService from '~/services/user.service.ts';
import toast from 'react-hot-toast';
import { IUserAddress } from '~/models';

interface AddressUpdateModalProps {
  visible: boolean;
  address?: IUserAddress;
  onClose: () => void;
  onSuccess: () => void;
}

const AddressUpdateModal: React.FC<AddressUpdateModalProps> = ({
  visible,
  address,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (address) {
      form.setFieldsValue(address);
    } else {
      form.resetFields();
    }
  }, [address, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const modal = { ...values, id: address?.id };
      await userService.updateAddress(modal);
      toast.success('Cập nhật địa chỉ thành công!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Cập nhật thông tin cá nhân thất bại!');
    }
  };

  return (
    <Modal title="Cập nhật địa chỉ" open={visible} onOk={handleUpdate} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên địa chỉ"
          name="addressName"
          rules={[{ required: true, message: 'Vui lòng nhập tên địa chỉ!' }]}
        >
          <Input placeholder="Nhập tên địa chỉ" />
        </Form.Item>
        <Form.Item
          label="Tên người nhận"
          name="receiverName"
          rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
        >
          <Input placeholder="Nhập tên người nhận" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại người nhận"
          name="receiverPhone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận!' }]}
        >
          <Input placeholder="Nhập số điện thoại người nhận" />
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

export default AddressUpdateModal;
