import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';
import { OrderDto } from '~/dto';

interface Props {
  order: OrderDto;
}

const OrderItem: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const onNavigateOrderTracking = () => {
    navigate(ROUTER_PATH.orderTracking.extract.replace(':code', props.order.code));
  };

  return (
    <div className="cr-order-item">
      <div className="cr-sidebar-wrap">
        <div className="cr-sidebar-block">
          <div className="cr-sb-title">
            <h3 className="cr-sidebar-title">
              <span>
                Mã đơn hàng:{' '}
                <span className="cr-order-code" onClick={() => onNavigateOrderTracking()}>
                  #{props.order.code}
                </span>
              </span>
              <span className="float-end">
                Trạng thái: <span className="cr-order-status">{props.order.status}</span>
              </span>
            </h3>
          </div>
          <div className="cr-sb-block-content">
            <div className="cr-sb-block-content">
              <div className="cr-checkout-summary">
                <div className="cr-table-content">
                  <table>
                    <tbody>
                    {props.order.products.map((product, index) => (
                      <tr key={index}>
                        <td className="cr-cart-name">
                          <div className="cr-cart-name-wrapper">
                            <Link
                              to={ROUTER_PATH.productDetail.extract.replace(
                                ':id',
                                product.productId?.toString(),
                              )}
                            >
                              <img
                                src={product.thumbnailUrl}
                                alt="product-1"
                                className="cr-cart-img"
                              />
                            </Link>
                            <div>
                              <Link
                                to={ROUTER_PATH.productDetail.extract.replace(
                                  ':id',
                                  product.productId?.toString(),
                                )}
                              >
                                <span>{product.productName}</span>
                                <span>x</span>
                                <span>{product.unit}</span>
                              </Link>
                              <div className="cr-cart-desc">
                                Màu sắc:
                                <ul className="cr-opt-color">
                                  <li className="active">{product.color}</li>
                                </ul>
                                Kích thước:
                                <ul className="cr-opt-size">
                                  <li className="active">{product.size}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="cr-checkout-summary-total">
                  <span className="text-left">Tổng tiền</span>
                  <span className="text-right">
                    {CurrencyUtils.formatCurrencyVND(
                      props.order.originTotalPrice +
                      props.order.shipFee -
                      props.order.voucherDiscountPrice,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
