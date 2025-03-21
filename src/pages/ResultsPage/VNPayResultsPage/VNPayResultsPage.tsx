import { Button, Flex, Result } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderService } from '~/services';
import { ROUTER_PATH } from '~/routes';

export interface IVNPAYResults {
  orderCode: string;
  isVerified: boolean;
  isSuccess: boolean;
  message: string;
}

const VNPayResultsPage = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<IVNPAYResults>();

  useEffect(() => {
    const query = Object.fromEntries(queryParams.entries());
    orderService.verifyPayment(query).then((res) => {
      setResults(res.data);
    });
  }, [queryParams]);

  const onPayment = () => {
    const orderCode = queryParams.get('vnp_TxnRef');
    orderService.buildUrlPayment(orderCode as string).then((res) => {
      window.location.href = res.data.paymentUrl as string;
    });
  };

  return (
    <section className="section-login padding-tb-150">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {results?.isVerified && results?.isSuccess && (
              <Result
                status="success"
                title="Đơn hàng của bạn đã được thanh toán thành công."
                subTitle={
                  <Flex vertical={true}>
                    <p>Mã đơn hàng: {results?.orderCode}</p>
                    <p>
                      Cảm ơn bạn đã đặt hàng! Vui lòng chờ 1-2 ngày để hệ thống xử lý đơn hàng.
                      Chúng tôi sẽ sớm gửi thông tin cập nhật đến bạn.
                    </p>
                  </Flex>
                }
                extra={[
                  <Button key="buy" onClick={() => navigate(ROUTER_PATH.home.extract)}>
                    Tiếp tục mua sắm
                  </Button>,
                  <Button
                    type="primary"
                    key="console"
                    onClick={() =>
                      navigate(
                        ROUTER_PATH.orderTracking.extract.replace(':code', results.orderCode)
                      )
                    }
                  >
                    Xem chi tiết đơn hàng
                  </Button>,
                ]}
              />
            )}
            {!results?.isVerified ||
              (!results.isSuccess && (
                <Result
                  status="error"
                  title="Đơn hàng của bạn đã được thanh toán thất bại."
                  subTitle={
                    <Flex vertical={true}>
                      <p>Mã đơn hàng: {results?.orderCode}</p>
                      <p>
                        Vui lòng thực hiện lại thanh toán để hoàn tất đơn hàng. Nếu bạn cần hỗ trợ,
                        đừng ngần ngại liên hệ với chúng tôi!
                      </p>
                    </Flex>
                  }
                  extra={[
                    <Button key="buy" onClick={() => navigate(ROUTER_PATH.home.extract)}>
                      Tiếp tục mua sắm
                    </Button>,
                    <Button type="primary" key="console" onClick={onPayment}>
                      Thanh toán lại đơn hàng
                    </Button>,
                  ]}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default VNPayResultsPage;
