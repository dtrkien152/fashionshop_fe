import React, { useEffect, useState } from 'react';
import {
    Button,
    List,
    Card,
    Radio,
    Space,
    Popconfirm,
    Col,
    Row,
    message,
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import AddressUpdateModal from './AddressUpdateModal';
import AddressCreateModal from './AddressCreateModal';
import userService from '~/services/user.service.ts';

export interface Address {
    id: number;
    addressName: string;
    fullAddress: string;
    isDefault: boolean;
}

const AddressManagementTab: React.FC = () => {
    const [addressData, setAddressData] = useState<Address[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Partial<Address> | null>(null);
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

    const handleCreateAddress = () => {
        setIsCreateModalOpen(true);
    };

    const handleUpdateAddress = (address: Address) => {
        setEditingAddress(address);
        setIsUpdateModalOpen(true);
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
                        <Card style={{ width: '100%' }}>
                            <Row align="middle">
                                <Col flex="40px">
                                    <Radio
                                        checked={item.id === defaultAddressId}
                                        onChange={() => handleSetDefault(item.id)}
                                    />
                                </Col>
                                <Col flex="auto">
                                    <Row align="middle">
                                        <Col flex="25px">
                                            <EnvironmentOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                                        </Col>
                                        <Col flex="auto">
                                            <p style={{ margin: 0, fontWeight: 'bold' }}>
                                                {item.id === defaultAddressId && (
                                                    <span style={{ color: 'gray', marginRight: '8px' }}>
                                                        (Mặc định)
                                                    </span>
                                                )}
                                                {item.addressName}
                                            </p>
                                            <p style={{ margin: 0, color: '#555' }}>{item.fullAddress}</p>
                                        </Col>
                                        <Space>
                                            <Button type="link" onClick={() => handleUpdateAddress(item)}>Sửa</Button>
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn xóa địa chỉ này không?"
                                                onConfirm={() => handleDelete(item.id)}
                                                okText="Xóa"
                                                cancelText="Hủy"
                                            >
                                                <Button type="link" danger>Xóa</Button>
                                            </Popconfirm>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
            <Button type="dashed" onClick={handleCreateAddress}>Thêm địa chỉ mới</Button>

            <AddressCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchAddresses} // Đảm bảo hàm fetchAddresses được truyền đúng
            />


            <AddressUpdateModal
                visible={isUpdateModalOpen}
                address={editingAddress}
                onClose={() => setIsUpdateModalOpen(false)}
                onSuccess={fetchAddresses}
            />


        </>
    );
};

export default AddressManagementTab;
