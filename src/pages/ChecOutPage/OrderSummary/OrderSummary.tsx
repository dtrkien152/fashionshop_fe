import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';

interface Props {}

const OrderSummary: React.FC<Props> = () => {
  const { products } = useSelector((state: RootState) => state.cart);

  return (
    <div className="cr-sidebar-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Order List Product</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-pro">
            {products.map((product, index) => (
              <div className="col-sm-12 mb-6" key={index}>
                <div className="cr-product-inner">
                  <div className="cr-pro-image-outer">
                    <div className="cr-pro-image">
                      <Link
                        to={ROUTER_PATH.productDetail.extract.replace(
                          ':id',
                          product.productId.toString()
                        )}
                        className="image"
                      >
                        <img className="main-image" src={product.thumbnailUrl} alt="Product" />
                      </Link>
                    </div>
                  </div>
                  <div className="cr-pro-content cr-product-details">
                    <h5 className="cr-pro-title">
                      <Link
                        to={ROUTER_PATH.productDetail.extract.replace(
                          ':id',
                          product.productId.toString()
                        )}
                      >
                        {product.productName}
                      </Link>
                    </h5>
                    <div className="cart-pro-desc">
                      <div className="cr-pro-color">
                        <ul className="cr-opt-swatch cr-change-img">
                          <li className="active">
                            <a className="cr-opt-clr-img">
                              <span style={{ backgroundColor: product.color }}></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <span>-</span>
                      <div className="cr-pro-size">
                        <ul className="cr-opt-size">
                          <li className="active">
                            <a className="cr-opt-sz">{product.size}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="cr-price">
                      <span className="new-price">{CurrencyUtils.formatCurrencyVND(product.salePrice)}</span>{' '}
                      <span className="old-price">{CurrencyUtils.formatCurrencyVND(product.originalPrice)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
