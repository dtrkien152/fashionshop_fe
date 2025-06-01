import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Spin } from 'antd';
import userService from '~/services/user.service.ts';
import toast from 'react-hot-toast';
import { ghnService } from '~/services/ghn.service.ts';

const { Option } = Select;

interface AddressCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddressCreateModal: React.FC<AddressCreateModalProps> = ({
                                                                 isOpen,
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

  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

  useEffect(() => {
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

    fetchProvinces();
    form.resetFields();
    setDistricts([]);
    setWards([]);
    setSelectedProvinceName('');
    setSelectedDistrictName('');
    setSelectedWardName('');
  }, [isOpen]);

  const updateFullAddress = (ward?: string, district?: string, province?: string) => {
    const full = [ward, district, province].filter(Boolean).join(', ');
    form.setFieldsValue({ fullAddress: full });
  };

  const handleProvinceChange = async (provinceId: number) => {
    form.setFieldsValue({ districtId: undefined, wardCode: undefined });
    setDistricts([]);
    setWards([]);
    setSelectedProvinceName('');
    setSelectedDistrictName('');
    setSelectedWardName('');
    setLoadingDistricts(true);
    try {
      const res = await ghnService.getDistricts(provinceId);
      setDistricts(res.data);

      const selected = provinces.find(p => p.ProvinceID === provinceId);
      if (selected) {
        setSelectedProvinceName(selected.ProvinceName);
        updateFullAddress(undefined, undefined, selected.ProvinceName);
      }
    } catch {
      toast.error('Không thể tải danh sách quận/huyện!');
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleDistrictChange = async (districtId: number) => {
    form.setFieldsValue({ wardCode: undefined });
    setWards([]);
    setSelectedDistrictName('');
    setSelectedWardName('');
    setLoadingWards(true);
    try {
      const res = await ghnService.getWards(districtId);
      setWards(res.data);

      const selected = districts.find(d => d.DistrictID === districtId);
      if (selected) {
        setSelectedDistrictName(selected.DistrictName);
        updateFullAddress(undefined, selected.DistrictName, selectedProvinceName);
      }
    } catch {
      toast.error('Không thể tải danh sách phường/xã!');
    } finally {
      setLoadingWards(false);
    }
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await userService.addAddress(values);
      toast.success('Đã thêm địa chỉ mới!');
      onSuccess();
      onClose();
      form.resetFields();
    } catch (error) {
      toast.error('Lỗi khi thêm địa chỉ!');
    }
  };

  return (
    <Modal title="Thêm địa chỉ mới" open={isOpen} onOk={handleCreate} onCancel={onClose}>
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
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại người nhận!' },
            {
              pattern: /^0\d{9}$/,
              message: 'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0',
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại người nhận"
            maxLength={10}
            type="tel"
          />
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
            {provinces.map(prov => (
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
            {districts.map(dist => (
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
            onChange={(wardCode) => {
              const selected = wards.find(w => w.WardCode === wardCode);
              if (selected) {
                setSelectedWardName(selected.WardName);
                updateFullAddress(selected.WardName, selectedDistrictName, selectedProvinceName);
              }
            }}
          >
            {wards.map(ward => (
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

export default AddressCreateModal;
