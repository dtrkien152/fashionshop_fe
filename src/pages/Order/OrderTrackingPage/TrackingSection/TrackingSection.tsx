import { OrderDto } from '~/dto';
import * as React from 'react';
import { useMemo } from 'react';
import moment from 'moment';
import { ORDER_STATUS } from '~/constants';

interface Props {
  order?: OrderDto;
}

const TrackingSection: React.FC<Props> = (props) => {
  const stepsIndex = useMemo(() => {
    if (!props.order) return -1;
    switch (props.order.status) {
      case ORDER_STATUS.PENDING:
        return 0;
      case ORDER_STATUS.CONFIRMED:
        return 1;
      case ORDER_STATUS.SHIPPING:
        return 2;
      case ORDER_STATUS.COMPLETED:
        return 3;
      case ORDER_STATUS.RETURN:
        return 4;
      default:
        return -1;
    }
  }, [props.order]);

  const steps = [
    { label: 'Đơn hàng<br />chờ xác nhận', iconClass: 'ri-loader-2-line' },
    { label: 'Đơn hàng<br />xác nhận', iconClass: 'ri-shield-check-line' },
    { label: 'Đơn hàng<br />đang vận chuyển', iconClass: 'ri-truck-line' },
    { label: 'Đơn hàng<br />hoàn thành', iconClass: 'ri-home-5-line' },
    { label: 'Đơn hàng<br />trả lại', iconClass: 'ri-arrow-go-back-line' },
  ];

  return (
    <section className="cr-track padding-tb-50">
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="cr-track-box">
              {props.order?.status === ORDER_STATUS.REJECTED && (
                <p className="cr-track-note mb-24">
                  * Đơn hàng này đã bị hủy. Nếu bạn vẫn có nhu cầu, vui lòng đặt lại để chúng tôi có
                  thể phục vụ bạn tốt nhất. Cảm ơn bạn!
                </p>
              )}
              <div className="row">
                <div className="col-md-3 m-b-767">
                  <div className="cr-track-card">
                    <span className="cr-track-title">Mã đơn hàng</span>
                    <span>#{props.order?.code}</span>
                  </div>
                </div>
                <div className="col-md-3 m-b-767">
                  <div className="cr-track-card">
                    <span className="cr-track-title">Mã vận chuyển</span>
                    <span>{props.order?.shipCode}</span>
                  </div>
                </div>
                <div className="col-md-3 m-b-767">
                  <div className="cr-track-card">
                    <span className="cr-track-title">Ngày tạo đơn</span>
                    <span>{moment(props.order?.createdAt).format('MMM Do YY')}</span>
                  </div>
                </div>
                <div className="col-md-3 m-b-767">
                  <div className="cr-track-card">
                    <span className="cr-track-title">Phương thức thanh toán</span>
                    <span>
                      {props.order?.paymentType} <span>({props.order?.paymentStatus})</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="cr-steps">
                <div className="cr-steps-body">
                  {steps.map((step, index) => (
                    <div className={'cr-step ' + (stepsIndex >= index ? 'cr-step-completed' : '')}>
                      {stepsIndex >= index && (
                        <span className="cr-step-indicator">
                          <i className="ri-check-line"></i>
                        </span>
                      )}
                      <span className="cr-step-icon">
                        <i className={step.iconClass}></i>
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: step.label }}></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrackingSection;
