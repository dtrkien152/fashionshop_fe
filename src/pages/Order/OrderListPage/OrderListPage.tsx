import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';

const OrderListPage = () => {
  const { products } = useSelector((state: RootState) => state.cart);
  return (
    <>
      <div className="cr-order-list padding-b-100">
        <div className="container">
          <div className="cr-sidebar-wrap">
            <div className="cr-sidebar-block">
              <div className="cr-sb-title">
                <h3 className="cr-sidebar-title">Mã đơn hàng: <span className="cr-order-code">#ORDFMMSMtwurJpt</span></h3>
              </div>
              <div className="cr-sb-block-content">
                <div className="cr-sb-block-content">
                  <div className="cr-checkout-summary">
                    <div className="cr-table-content">
                      <table>
                        <tbody>
                        {products.map((product, index) => (
                          <tr key={index}>
                            <td className="cr-cart-name">
                              <div className="cr-cart-name-wrapper">
                                <Link
                                  to={ROUTER_PATH.productDetail.extract.replace(
                                    ':id',
                                    product.productId.toString()
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
                                      product.productId.toString()
                                    )}
                                  >
                                    <span>{product.productName}</span><span>x</span><span>{product.unit}</span>
                                  </Link>
                                  <div className="cr-cart-desc">
                                    Màu sắc:
                                    <div className="cr-pro-color">
                                      <ul className="cr-opt-swatch cr-change-img">
                                        <li className="active">
                                          <a className="cr-opt-clr-img">
                                            <span style={{ backgroundColor: product.color }}></span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    Kích thước:
                                    <div className="cr-pro-size">
                                      <ul className="cr-opt-size">
                                        <li className="active">
                                          <a className="cr-opt-sz">{product.size}</a>
                                        </li>
                                      </ul>
                                    </div>
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
                      <span className="text-left">Total Amount</span>
                      <span className="text-right">{CurrencyUtils.formatCurrencyVND(1000000 + 30000 - 20000)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderListPage;
