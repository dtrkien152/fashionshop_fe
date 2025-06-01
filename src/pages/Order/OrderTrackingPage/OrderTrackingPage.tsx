import { TrackingSection } from '~/pages/Order/OrderTrackingPage/TrackingSection';
import { OrderProductSection } from '~/pages/Order/OrderTrackingPage/OrderProductSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderService, productService } from '~/services';
import { OrderDto } from '~/dto';
import toast from 'react-hot-toast';

const OrderTrackingPage = () => {
  const [order, setOrder] = useState<OrderDto>();
  const { code } = useParams<{ code: string }>();
  useEffect(() => {
    fetchOrder();
  }, [code]);

  const fetchOrder = () => {
    if (!code) return;
    orderService.getOrder(code).then((res) => {
      setOrder(res.data);
    });
  };

  const handleAddReview = (values: any) => {
    return productService
      .addReviewProduct({
        ...values,
        orderId: order?.id,
      })
      .then((res) => {
        toast.success('Đánh giá thành công');
        fetchOrder();
      });
  };

  const handleEditReview = (values: any) => {
    return productService.editReviewProduct(values).then((res) => {
      toast.success('Sửa đánh giá thành công');
      fetchOrder();
    });
  };

  const handleCancel = () => {
    orderService.handleCancelOrder(code).then((res) => {
      toast.success('Huỷ đơn hàng thành công');
      fetchOrder();
    })
  }

  return (
    <>
      <TrackingSection order={order} />
      <OrderProductSection
        order={order}
        onAddProductReview={handleAddReview}
        onEditProductReview={handleEditReview}
        onCancelOrder={handleCancel}
      />
    </>
  );
};
export default OrderTrackingPage;
