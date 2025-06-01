import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Spin } from 'antd';
import userService from '~/services/user.service.ts';
import toast from 'react-hot-toast';
import { IUserAddress } from '~/models';
import { ghnService } from '~/services/ghn.service.ts';

const { Option } = Select;

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

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Load danh sách tỉnh
  const fetchProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const res = await ghnService.getProvinces();
      setProvinces(res.data);
    } catch {
      toast.error('Không thể tải danh sách tỉnh/thành!');
    } finally {
      setLoadingProvinces(false);
    }
  };

  const handleProvinceChange = async (provinceId: number) => {
    form.setFieldsValue({ districtId: undefined, wardCode: undefined });
    setDistricts([]);
    setWards([]);
    setLoadingDistricts(true);
    try {
      const res = await ghnService.getDistricts(provinceId);
      setDistricts(res.data);
    } catch {
      toast.error('Không thể tải danh sách quận/huyện!');
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleDistrictChange = async (districtId: number) => {
    form.setFieldsValue({ wardCode: undefined });
    setWards([]);
    setLoadingWards(true);
    try {
      const res = await ghnService.getWards(districtId);
      setWards(res.data);
    } catch {
      toast.error('Không thể tải danh sách phường/xã!');
    } finally {
      setLoadingWards(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchProvinces();
      form.resetFields();

      if (address) {
        form.setFieldsValue(address);

        if (address.provinceId) {
          handleProvinceChange(address.provinceId).then(() => {
            if (address.districtId) {
              handleDistrictChange(address.districtId).then(() => {
                form.setFieldsValue({
                  provinceId: address.provinceId,
                  districtId: address.districtId,
                  wardCode: address.wardCode+'',
                });
              });
            }
          });
        }
      }
    }
  }, [visible, address]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values, id: address?.id };
      await userService.updateAddress(payload);
      toast.success('Cập nhật địa chỉ thành công!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Cập nhật địa chỉ thất bại!');
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
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại người nhận" />
          </Form.Item>

          <Form.Item
              label="Tỉnh/Thành phố"
              name="provinceId"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
          >
            <Select
                placeholder="Chọn tỉnh/thành phố"
                loading={loadingProvinces}
                onChange={handleProvinceChange}
                showSearch
                optionFilterProp="children"
            >
              {provinces.map((prov) => (
                  <Option key={prov.ProvinceID} value={prov.ProvinceID}>
                    {prov.ProvinceName}
                  </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="Quận/Huyện"
              name="districtId"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
          >
            <Select
                placeholder="Chọn quận/huyện"
                loading={loadingDistricts}
                onChange={handleDistrictChange}
                disabled={!form.getFieldValue('provinceId')}
                showSearch
                optionFilterProp="children"
            >
              {districts.map((dist) => (
                  <Option key={dist.DistrictID} value={dist.DistrictID}>
                    {dist.DistrictName}
                  </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="Phường/Xã"
              name="wardCode"
              rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
          >
            <Select
                placeholder="Chọn phường/xã"
                loading={loadingWards}
                disabled={!form.getFieldValue('districtId')}
                showSearch
                optionFilterProp="children"
            >
              {wards.map((ward) => (
                  <Option key={ward.WardCode} value={ward.WardCode}>
                    {ward.WardName}
                  </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="Địa chỉ chi tiết"
              name="fullAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
          >
            <Input placeholder="Ví dụ: Số 123, Đường ABC..." />
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default AddressUpdateModal;
