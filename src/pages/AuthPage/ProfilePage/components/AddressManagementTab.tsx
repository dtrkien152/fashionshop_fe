import React, { useEffect, useState } from 'react';
import { Button, List, Card, Input, Form, message, Modal, Radio, Space, Popconfirm } from 'antd';
import userService from '~/services/user.service.ts';

interface Address {
    id: number;
    fullAddress: string;
    isDefault: boolean;
}

const AddressManagementTab: React.FC = () => {
    const [addressData, setAddressData] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [newAddress, setNewAddress] = useState('');
    const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await userService.getAddresses();
            setAddressData(response.data);
            const defaultAddr = response.data.find((addr: Address) => addr.isDefault);
            setDefaultAddressId(defaultAddr?.id ?? null);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu địa chỉ!');
        }
    };

    const handleOpenModal = (address?: Address) => {
        setIsModalOpen(true);
        if (address) {
            setEditingAddress(address);
            setNewAddress(address.fullAddress);
        } else {
            setEditingAddress(null);
            setNewAddress('');
        }
    };

    const handleModalOk = async () => {
        try {
            if (editingAddress) {
                await userService.updateAddress(editingAddress.id, newAddress);
                message.success('Cập nhật địa chỉ thành công!');
            } else {
                await userService.addAddress(newAddress);
                message.success('Thêm địa chỉ mới thành công!');
            }
            setIsModalOpen(false);
            fetchAddresses();
        } catch (error) {
            message.error('Lỗi khi xử lý địa chỉ!');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await userService.deleteAddress(id);
            message.success('Xóa địa chỉ thành công!');
            fetchAddresses();
        } catch (error) {
            message.error('Lỗi khi xóa địa chỉ!');
        }
    };

    const handleSetDefault = async (id: number) => {
        try {
            await userService.updateDefaultAddress(id);
            message.success('Đã cập nhật địa chỉ mặc định!');
            setDefaultAddressId(id);
        } catch (error) {
            message.error('Lỗi khi cập nhật địa chỉ mặc định!');
        }
    };

    return (
        <>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={addressData}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Card>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Radio
                                    checked={item.id === defaultAddressId}
                                    onChange={() => handleSetDefault(item.id)}
                                >
                                    {item.fullAddress}
                                </Radio>
                                <Space>
                                    <Button type="link" onClick={() => handleOpenModal(item)}>Sửa</Button>
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa địa chỉ này không?"
                                        onConfirm={() => handleDelete(item.id)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button type="link" danger>Xóa</Button>
                                    </Popconfirm>
                                </Space>
                            </Space>
                        </Card>
                    </List.Item>
                )}
            />

            <Button type="dashed" onClick={() => handleOpenModal()}>Thêm địa chỉ mới</Button>

            <Modal
                title={editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                visible={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Địa chỉ">
                        <Input
                            placeholder="Nhập địa chỉ"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddressManagementTab;
