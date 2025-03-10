import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { removeFromCart, updateUnit } from '~/shared/reducers/cartReducer.ts';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';
import { cartService } from '~/services';
import toast from 'react-hot-toast';
import { CartDetailRequest } from '~/dto';

const CartDetailPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart);
  const { cartCode } = useSelector((state: RootState) => state.cart);

  const onUpdateUnit = (productId: number, color: string, size: string, unit: number) => {
    if (unit === 0) return onRemoveFromCart(productId, color, size);
    if (!cartCode) return;
    const payload: CartDetailRequest = {
      products: [{
        productId: productId,
        color: color,
        size: size,
        unit: unit
      }],
      cartCode: cartCode
    }
    cartService.updateToCartDetails(payload).then(() => {
      dispatch(updateUnit({ productId, color, size, unit }));
    })
  };

  const onRemoveFromCart = (productId: number, color: string, size: string) => {
    if (!cartCode) return;
    cartService.removeCartDetail(cartCode, productId, color, size).then(() => {
      toast.success("Remove product in cart successfully!")
      dispatch(removeFromCart({ productId, color, size }));
    });
  };

  return (
    <section className="section-cart padding-tb-100">
      <div className="container">
        <div className="row d-none">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="cr-banner">
                <h2>Cart</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore lacus vel facilisis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="cr-cart-content"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <div className="row">
                <form action="#">
                  <div className="cr-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>price</th>
                          <th className="text-center">Quantity</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index}>
                            <td className="cr-cart-name">
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
                                {product.productName}
                              </Link>
                            </td>
                            <td className="cr-cart-price">
                              <span className="amount">{formatCurrencyVND(product.salePrice)}</span>
                            </td>
                            <td className="cr-cart-qty">
                              <div className="cart-qty-plus-minus">
                                <button type="button" className="plus">
                                  +
                                </button>
                                <input
                                  type="text"
                                  placeholder="."
                                  value={product.unit}
                                  minLength={1}
                                  maxLength={20}
                                  className="quantity"
                                  onChange={(e) =>
                                    onUpdateUnit(
                                      product.productId,
                                      product.color,
                                      product.size,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <button type="button" className="minus">
                                  -
                                </button>
                              </div>
                            </td>
                            <td className="cr-cart-subtotal">{product.salePrice * product.unit}</td>
                            <td className="cr-cart-remove">
                              <a
                                onClick={() =>
                                  onRemoveFromCart(product.productId, product.color, product.size)
                                }
                              >
                                <i className="ri-delete-bin-line"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cr-cart-update-bottom">
                        <Link to={ROUTER_PATH.home.extract} className="cr-links">
                          Continue Shopping
                        </Link>
                        <Link to={ROUTER_PATH.checkout.extract} className="cr-button">
                          Check Out
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CartDetailPage;
