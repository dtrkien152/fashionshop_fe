import * as React from 'react';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { IUserAddress } from '~/models';
import userService from '~/services/user.service.ts';
import { ghnService } from '~/services/ghn.service.ts';
import toast from 'react-hot-toast';

interface Props {
  error: any;
  setError: (error: any) => void;
  onBinding: (data: {
    fullName?: string;
    phone?: string;
    address?: string;
    provinceId?: number;
    districtId?: number;
    wardCode?: string;
  }) => void;
}

const CustomerDetails: React.FC<Props> = (props) => {
  const [addressType, setAddressType] = useState<'EXIST' | 'NEW'>('EXIST');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const [districtId, setDistrictId] = useState<number | undefined>();
  const [wardCode, setWardCode] = useState<string>('');
  const [address, setAddress] = useState('');
  const [addressTemplates, setAddressTemplates] = useState<IUserAddress[]>([]);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  useEffect(() => {
    fetchAddressTemplates().then();
  }, []);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
    setLoadingProvinces(true);
    ghnService
      .getProvinces()
      .then((res) => {
        setProvinces(res.data);
      })
      .catch(() => {
        toast.error('Không thể tải danh sách tỉnh/thành!');
      })
      .finally(() => {
        setLoadingProvinces(false);
      });
  }, []);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
    if (!provinceId) return;
    setLoadingDistricts(true);
    ghnService
      .getDistricts(provinceId)
      .then((res) => {
        setDistricts(res.data);
      })
      .catch(() => {
        toast.error('Không thể tải danh sách quận/huyện!');
      })
      .finally(() => {
        setLoadingDistricts(false);
      });
  }, [provinceId]);

  useEffect(() => {
    setWards([]);
    if (!districtId) return;
    setLoadingWards(true);
    ghnService
      .getWards(districtId)
      .then((res) => {
        setWards(res.data);
      })
      .catch(() => {
        toast.error('Không thể tải danh sách phường/xã!');
      })
      .finally(() => {
        setLoadingWards(false);
      });
  }, [districtId]);

  const onFullNameChange = (value: string) => {
    setFullName(value);
    props.onBinding({ fullName: value, phone, address, provinceId, districtId, wardCode });
    props.setError((error: any) => ({
      ...error,
      fullName: undefined,
    }));
  };

  const onPhoneChange = (value: string) => {
    setPhone(value);
    props.onBinding({ phone: value, fullName, address, provinceId, districtId, wardCode });
    props.setError((error: any) => ({
      ...error,
      phone: undefined,
    }));
  };

  const onAddressChange = (value: string) => {
    setAddress(value);
    props.onBinding({ address: value, fullName, phone, provinceId, districtId, wardCode });
    props.setError((error: any) => ({
      ...error,
      address: undefined,
    }));
  };

  const onProvinceIdChange = (value: number) => {
    setProvinceId(value);
    props.onBinding({ provinceId: value, fullName, phone, districtId: undefined, wardCode: undefined });
    props.setError((error: any) => ({
      ...error,
      provinceId: undefined,
    }));
  };

  const onDistrictIdChange = (value: number) => {
    setDistrictId(value);
    props.onBinding({ districtId: value, fullName, phone, provinceId, wardCode: undefined });
    props.setError((error: any) => ({
      ...error,
      districtId: undefined,
    }));
  };

  const onWardCodeChange = (value: string) => {
    setWardCode(value);
    props.onBinding({ wardCode: value, fullName, phone, provinceId, districtId });
    props.setError((error: any) => ({
      ...error,
      wardCode: undefined,
    }));
  };

  const fetchAddressTemplates = async () => {
    try {
      const response = await userService.getAddresses();
      setAddressTemplates(response.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu địa chỉ!', error);
    }
  };

  const onChangeAddressType = (type: 'EXIST' | 'NEW') => {
    setAddressType(type);
    setFullName('');
    setPhone('');
    setAddress('');
    setProvinceId(undefined);
    setDistrictId(undefined);
    setWardCode('');
    props.onBinding({ fullName: '', phone: '', address: '' });
    props.setError((error: any) => ({
      ...error,
      fullName: undefined,
      phone: undefined,
      address: undefined,
      provinceId: undefined,
      districtId: undefined,
      wardCode: undefined,
    }));
  };

  return (
    <div className="cr-checkout-wrap">
      <div className="cr-checkout-block cr-check-bill">
        <h3 className="cr-checkout-title">Địa chỉ giao hàng</h3>
        <div className="cr-bl-block-content">
          <div className="cr-check-subtitle">Lựa chọn địa chỉ giao hàng</div>
          <span className="cr-bill-option">
            <span>
              <input
                type="radio"
                id="exist-address"
                name="address-options"
                checked={addressType === 'EXIST'}
                onChange={() => onChangeAddressType('EXIST')}
              />
              <label htmlFor="exist-address">Sử dụng địa chỉ có sẵn</label>
            </span>
            <span>
              <input
                type="radio"
                id="new-address"
                name="address-options"
                checked={addressType === 'NEW'}
                onChange={() => onChangeAddressType('NEW')}
              />
              <label htmlFor="new-address">Sử dụng địa chỉ mới</label>
            </span>
          </span>
          <div className="cr-check-bill-form mb-minus-24">
            {addressType === 'EXIST' && (
              <span className="cr-bill-wrap">
                <label className="required">Chọn địa chỉ đã lưu</label>
                <Select
                  className="cr-address-select"
                  placeholder="Chọn địa chỉ để giao hàng"
                  options={addressTemplates.map((addr) => ({
                    label: addr.addressName,
                    value: addr.id,
                    receiverName: addr.receiverName,
                    receiverPhone: addr.receiverPhone,
                    fullAddress: addr.fullAddress,
                    provinceId: addr.provinceId,
                    districtId: addr.districtId,
                    wardCode: addr.wardCode,
                  }))}
                  onChange={(_, option: any) => {
                    if (!option) return;
                    setFullName(option.receiverName);
                    setPhone(option.receiverPhone);
                    setAddress(option.fullAddress);
                    setProvinceId(option.provinceId);
                    setDistrictId(option.districtId);
                    setWardCode(option.wardCode.toString());
                    props.onBinding({
                      fullName: option.receiverName,
                      phone: option.receiverPhone,
                      address: option.fullAddress,
                      provinceId: option.provinceId,
                      districtId: option.districtId,
                      wardCode: option.wardCode,
                    });
                  }}
                />
              </span>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Họ và Tên</label>
              <input
                type="text"
                name="fullName"
                placeholder="Vui lòng nhập họ tên"
                value={fullName}
                readOnly={addressType === 'EXIST'}
                required
                onInput={(e: any) => onFullNameChange(e.target.value)}
              />
            </span>
            {props.error.fullName && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.fullName}
              </div>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                placeholder="Vui lòng nhập số điện thoại"
                value={phone}
                readOnly={addressType === 'EXIST'}
                required
                onInput={(e: any) => onPhoneChange(e.target.value)}
              />
            </span>
            {props.error.phone && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.phone}
              </div>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Tỉnh/Thành Phố</label>
              <Select
                id="cr-select-city"
                className={'cr-address-select ' + (addressType === 'EXIST' ? 'readOnly' : '')}
                placeholder="Chọn tỉnh/thành phố"
                loading={loadingProvinces}
                value={provinceId}
                onChange={onProvinceIdChange}
                showSearch
                optionFilterProp="children"
              >
                {provinces.map((prov) => (
                  <Select.Option key={prov.ProvinceID} value={prov.ProvinceID}>
                    {prov.ProvinceName}
                  </Select.Option>
                ))}
              </Select>
            </span>
            {props.error.provinceId && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.provinceId}
              </div>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Quận/Huyện</label>
              <Select
                id="cr-select-country"
                className={'cr-address-select ' + (addressType === 'EXIST' ? 'readOnly' : '')}
                placeholder="Chọn quận/huyện"
                loading={loadingDistricts}
                onChange={onDistrictIdChange}
                value={districtId}
                disabled={!provinceId}
                showSearch
                optionFilterProp="children"
              >
                {districts.map((dist) => (
                  <Select.Option key={dist.DistrictID} value={dist.DistrictID}>
                    {dist.DistrictName}
                  </Select.Option>
                ))}
              </Select>
            </span>
            {props.error.districtId && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.districtId}
              </div>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Phường/Xã</label>
              <Select
                id="cr-select-country"
                className={'cr-address-select ' + (addressType === 'EXIST' ? 'readOnly' : '')}
                placeholder="Chọn phường/xã"
                onChange={onWardCodeChange}
                loading={loadingWards}
                disabled={!districtId}
                value={wardCode}
                showSearch
                optionFilterProp="children"
              >
                {wards.map((ward) => (
                  <Select.Option key={ward.WardCode} value={ward.WardCode}>
                    {ward.WardName}
                  </Select.Option>
                ))}
              </Select>
            </span>
            {props.error.wardCode && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.wardCode}
              </div>
            )}
            <span className="cr-bill-wrap">
              <label className="required">Địa chỉ cụ thể</label>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ cụ thể"
                value={address}
                readOnly={addressType === 'EXIST'}
                required
                onInput={(e: any) => onAddressChange(e.target.value)}
              />
            </span>
            {props.error.address && (
              <div className="error-message" style={{ marginBottom: '16px' }}>
                {props.error.address}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetails;
