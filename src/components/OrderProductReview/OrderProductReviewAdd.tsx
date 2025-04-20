import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Rate } from 'antd';
import { OrderDto } from '~/dto';

interface Props {
  open: boolean;
  onSave: (payload: any) => void;
  onClose: () => void;
  productSubDetailId?: number;
  productName?: string;
}

const OrderProductReviewAdd: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.open) {
      initData();
    } else {
      form.resetFields();
    }
  }, [props.open]);

  const initData = () => {
    form.setFieldsValue({
      productName: props.productName,
    });
  };

  const onSave = async () => {
    const values = await form.validateFields();
    props.onSave({
      productSubDetailId: props.productSubDetailId,
      productName: props.productName,
      rating: values['rating'],
      comment: values['comment'],
    });
  };

  const voteDesc = ['Tồi tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'];

  return (
    <Modal
      title={'Đánh giá sản phẩm'}
      open={props.open}
      onClose={props.onClose}
      onCancel={props.onClose}
      onOk={onSave}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item label="Sản phẩm" name="productName">
          <Input className="here slug-title" type="text" readOnly />
        </Form.Item>
        <Form.Item
          label="Đánh giá"
          layout={'horizontal'}
          name="rating"
          rules={[{ required: true, message: 'Vui lòng đánh giá sản phẩm!' }]}
        >
          <Rate style={{float: 'right', marginRight: '100px'}} tooltips={voteDesc} />
        </Form.Item>
        <Form.Item
          label="Cảm nhận"
          name="comment"
          rules={[{ required: true, message: 'Vui lòng nhập cảm nhận sản phẩm!' }]}
        >
          <Input
            className="here slug-title"
            type="text"
            placeholder="Nhập cảm nhận sản phẩm"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default OrderProductReviewAdd;
