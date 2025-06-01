import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { OrderDto } from '~/dto';

interface Props {
  open: boolean;
  onSave: (payload: any) => void;
  onClose: () => void;
  fee?: number;
}

const OrderShippingModal: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const onSave = async () => {
    const values = await form.validateFields();
    props.onSave({
      code: values['code'],
      height: values['height'],
      width: values['width'],
      weight: values['weight'],
    });
  };

  return (
    <Modal
      title={'🚚 Phí vận chuyển'}
      open={props.open}
      okText={'Xác nhận'}
      cancelText={'Huỷ'}
      onClose={props.onClose}
      onCancel={props.onClose}
      onOk={onSave}
    >
      <p>
        Đơn hàng của bạn có phí ship là {props.fee} đồng. Cảm ơn bạn đã mua sắm cùng chúng tôi! 😊
      </p>
    </Modal>
  );
};
export default OrderShippingModal;
