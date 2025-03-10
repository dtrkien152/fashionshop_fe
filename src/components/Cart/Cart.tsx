import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { removeFromCart, setOpenCart, updateUnit } from '~/shared/reducers/cartReducer.ts';
import { useMemo } from 'react';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.cart);

  const totalPrice = useMemo(
    () => products.reduce((acc, current) => acc + current.salePrice, 0),
    [products]
  );

  const onUpdateUnit = (productId: number, color: string, size: string, unit: number) => {
    dispatch(updateUnit({ productId, color, size, unit }));
  };

  const onRemoveFromCart = (productId: number, color: string, size: string) => {
    dispatch(removeFromCart({ productId, color, size }));
  };

  return (
    <>
      <div className="cr-cart-overlay" style={{ display: props.open ? 'block' : 'none' }}></div>
      <div className={'cr-cart-view ' + (props.open ? 'cr-cart-view-active' : '')}>
        <div className="cr-cart-inner">
          <div className="cr-cart-top">
            <div className="cr-cart-title">
              <h6>My Cart</h6>
              <button type="button" className="close-cart" onClick={props.onClose}>
                ×
              </button>
            </div>
            <ul className="crcart-pro-items">
              {products.map((product, index) => (
                <li key={index}>
                  <Link
                    to={ROUTER_PATH.productDetail.extract.replace(
                      ':id',
                      product.productId.toString()
                    )}
                    className="crside_pro_img"
                  >
                    <img src={product.thumbnailUrl} alt="product-1" />
                  </Link>
                  <div className="cr-pro-content">
                    <Link
                      to={ROUTER_PATH.productDetail.extract.replace(
                        ':id',
                        product.productId.toString()
                      )}
                      className="cart_pro_title"
                    >
                      {product.productName}
                    </Link>
                    <span className="cart-price">
                      <span>{formatCurrencyVND(product.salePrice)}</span>
                    </span>
                    <div className="cr-cart-qty">
                      <div className="cart-qty-plus-minus">
                        <button
                          type="button"
                          className="plus"
                          onClick={() =>
                            onUpdateUnit(
                              product.productId,
                              product.color,
                              product.size,
                              product.unit + 1
                            )
                          }
                        >
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
                        <button
                          type="button"
                          className="minus"
                          onClick={() =>
                            onUpdateUnit(
                              product.productId,
                              product.color,
                              product.size,
                              product.unit - 1
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <a
                      onClick={() =>
                        onRemoveFromCart(product.productId, product.color, product.size)
                      }
                      className="remove"
                    >
                      ×
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cr-cart-bottom">
            <div className="cart-sub-total">
              <table className="table cart-table">
                <tbody>
                  <tr>
                    <td className="text-left">Sub-Total :</td>
                    <td className="text-right">{formatCurrencyVND(totalPrice * 90)}</td>
                  </tr>
                  <tr>
                    <td className="text-left">VAT (10%) :</td>
                    <td className="text-right">{formatCurrencyVND(totalPrice * 0.1)}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Total :</td>
                    <td className="text-right primary-color">{formatCurrencyVND(totalPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart_btn">
              <a
                onClick={() => {
                  navigate(ROUTER_PATH.cart.extract);
                  dispatch(setOpenCart(false));
                }}
                className="cr-button"
              >
                View Cart
              </a>
              <a
                onClick={() => {
                  navigate(ROUTER_PATH.checkout.extract);
                  dispatch(setOpenCart(false));
                }}
                className="cr-btn-secondary"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
