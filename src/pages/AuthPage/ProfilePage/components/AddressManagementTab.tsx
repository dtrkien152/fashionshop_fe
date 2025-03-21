import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Flex, List, message, Popconfirm, Radio, Row, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import AddressUpdateModal from './AddressUpdateModal';
import AddressCreateModal from './AddressCreateModal';
import userService from '~/services/user.service.ts';
import { IUserAddress } from '~/models';

const AddressManagementTab: React.FC = () => {
  const [addressData, setAddressData] = useState<IUserAddress[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IUserAddress>();
  const [defaultAddressId, setDefaultAddressId] = useState<number>();

  useEffect(() => {
    fetchAddresses().then();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await userService.getAddresses();
      setAddressData(response.data);
      const defaultAddr = response.data.find((addr: IUserAddress) => addr.isDefault);
      setDefaultAddressId(defaultAddr?.id);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu địa chỉ!');
    }
  };

  const handleCreateAddress = () => {
    setIsCreateModalOpen(true);
  };

  const handleUpdateAddress = (address: IUserAddress) => {
    setEditingAddress(address);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      if (!id) return;
      await userService.deleteAddress(id);
      message.success('Xóa địa chỉ thành công!');
      fetchAddresses().then();
    } catch (error) {
      message.error('Lỗi khi xóa địa chỉ!');
    }
  };

  const handleSetDefault = async (id?: number) => {
    try {
      if (!id) return;
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
        style={{ paddingTop: '24px' }}
        grid={{ gutter: 16, column: 1 }}
        dataSource={addressData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <Flex align="baseline" gap={16}>
                <Radio
                  checked={item.id === defaultAddressId}
                  onChange={() => handleSetDefault(item.id)}
                />
                <Row align="stretch">
                  <Col flex="25px">
                    <EnvironmentOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                  </Col>
                  <Col flex="auto">
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                      {item.id === defaultAddressId && (
                        <span style={{ color: 'gray', marginRight: '8px' }}>(Mặc định)</span>
                      )}
                      {item.addressName}
                    </p>
                    <p style={{ margin: 0, color: '#555' }}>{item.fullAddress}</p>
                  </Col>
                  <Space>
                    <Button type="link" onClick={() => handleUpdateAddress(item)}>
                      Sửa
                    </Button>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa địa chỉ này không?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button type="link" danger>
                        Xóa
                      </Button>
                    </Popconfirm>
                  </Space>
                </Row>
              </Flex>
            </Card>
          </List.Item>
        )}
      />
      <Flex align="center" justify="center" style={{ paddingBottom: '24px' }}>
        <Button type="dashed" onClick={handleCreateAddress}>
          Thêm địa chỉ mới
        </Button>
      </Flex>

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
