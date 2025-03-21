import { TrackingSection } from '~/pages/Order/OrderTrackingPage/TrackingSection';
import { OrderProductSection } from '~/pages/Order/OrderTrackingPage/OrderProductSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderService } from '~/services';
import { OrderDto } from '~/dto';

const OrderTrackingPage = () => {
  const [order, setOrder] = useState<OrderDto>();
  const { code } = useParams<{ code: string }>();
  useEffect(() => {
    if (!code) return;
    orderService.getOrder(code).then((res) => {
      setOrder(res.data);
    })
  }, [code]);
  return (
    <>
      <TrackingSection order={order}/>
      <OrderProductSection order={order} />
    </>
  );
};
export default OrderTrackingPage;
