import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';

const OrderProductSection = () => {
  const { products } = useSelector((state: RootState) => state.cart);

  return (
    <div className="cr-track padding-b-100">
      <div className="container">
        <div className="cr-sidebar-wrap">
          <div className="cr-sidebar-block">
            <div className="cr-sb-block-content">
              <div className="cr-sb-block-content">
                <div className="cr-table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Quantity</th>
                      </tr>
                    </thead>
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
                                  {product.productName}
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
                          <td className="cr-cart-qty">
                            <div className="cart-qty-plus-minus">
                              <button type="button" disabled className="plus">
                                +
                              </button>
                              <input
                                type="text"
                                placeholder="."
                                value={product.unit}
                                minLength={1}
                                maxLength={20}
                                className="quantity"
                              />
                              <button type="button" disabled className="minus">
                                -
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cr-sidebar-wrap">
          <div className="cr-sidebar-block">
            <div className="cr-sb-title">
              <h3 className="cr-sidebar-title">Summary</h3>
            </div>
            <div className="cr-sb-block-content">
              <div className="cr-sb-block-content">
                <div className="cr-checkout-summary">
                  <div>
                    <span className="text-left">Sub-Total</span>
                    <span className="text-right">{formatCurrencyVND(1000000 * 0.9)}</span>
                  </div>
                  <div>
                    <span className="text-left">VAT (10%): </span>
                    <span className="text-right">{formatCurrencyVND(1000000 * 0.1)}</span>
                  </div>
                  <div>
                    <span className="text-left">Delivery Charges</span>
                    <span className="text-right">{formatCurrencyVND(30000)}</span>
                  </div>
                  <div>
                    <span className="text-left">Voucher Charges</span>
                    <span className="text-right">{formatCurrencyVND(20000)}</span>
                  </div>
                  <div className="cr-checkout-summary-total">
                    <span className="text-left">Total Amount</span>
                    <span className="text-right">{formatCurrencyVND(1000000 + 30000 - 20000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderProductSection;
