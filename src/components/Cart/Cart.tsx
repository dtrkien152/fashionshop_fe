import * as React from 'react';
import { IMAGES } from '~/images';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<Props> = (props) => {
  const products = [
    {
      id: 1,
      category: 'Women Tops',
      title: 'Colorful top for women',
      price: '$6.00',
      oldPrice: '$9.00',
      flag: {
        type: 'sale',
        value: '50% Sale',
      },
      images: [IMAGES.product.image18, IMAGES.product.image19],
      colors: ['#74c7ff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
    {
      id: 2,
      category: 'Men T-shirt',
      title: 'Blue T-shirt for men',
      price: '$11.00',
      oldPrice: '$22.00',
      flag: {
        type: 'trending',
        value: 'Trending',
      },
      images: [IMAGES.product.image30, IMAGES.product.image29],
      colors: ['#74c7ff'],
      size: ['M', 'XL'],
    },
    {
      id: 3,
      category: 'Kids',
      title: 'Pink T-shirt for girl',
      price: '$29.00',
      oldPrice: '$39.00',
      images: [IMAGES.product.image24, IMAGES.product.image25],
      colors: ['#74c7ff', '#f2f05f'],
      size: ['S', 'M'],
    },
  ];

  return (
    <>
      <div className="cr-cart-overlay"></div>
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
                  <a href="product-left-sidebar.html" className="crside_pro_img">
                    <img src={product.images[0]} alt="product-1" />
                  </a>
                  <div className="cr-pro-content">
                    <a href="product-left-sidebar.html" className="cart_pro_title">
                      {product.title}
                    </a>
                    <span className="cart-price">
                      <span>$56.00</span>
                    </span>
                    <div className="cr-cart-qty">
                      <div className="cart-qty-plus-minus">
                        <button type="button" className="plus">
                          +
                        </button>
                        <input
                          type="text"
                          placeholder="."
                          value="1"
                          minLength={1}
                          maxLength={20}
                          className="quantity"
                        />
                        <button type="button" className="minus">
                          -
                        </button>
                      </div>
                    </div>
                    <a href="javascript:void(0)" className="remove">
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
                    <td className="text-right">$300.00</td>
                  </tr>
                  <tr>
                    <td className="text-left">VAT (20%) :</td>
                    <td className="text-right">$60.00</td>
                  </tr>
                  <tr>
                    <td className="text-left">Total :</td>
                    <td className="text-right primary-color">$360.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart_btn">
              <Link to={ROUTER_PATH.cart.extract} className="cr-button">
                View Cart
              </Link>
              <Link to={ROUTER_PATH.checkout.extract} className="cr-btn-secondary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
