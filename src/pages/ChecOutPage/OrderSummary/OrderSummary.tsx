import * as React from 'react';
import { IMAGES } from '~/images';

interface Props {}

const OrderSummary: React.FC<Props> = () => {
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
    }
  ];

  return (
    <div className="cr-sidebar-wrap">
      <div className="cr-sidebar-block">
        <div className="cr-sb-title">
          <h3 className="cr-sidebar-title">Summary</h3>
        </div>
        <div className="cr-sb-block-content">
          <div className="cr-checkout-summary">
            <div>
              <span className="text-left">Sub-Total</span>
              <span className="text-right">$80.00</span>
            </div>
            <div>
              <span className="text-left">Delivery Charges</span>
              <span className="text-right">$80.00</span>
            </div>
            <div className="cr-checkout-summary-total">
              <span className="text-left">Total Amount</span>
              <span className="text-right">$80.00</span>
            </div>
          </div>
          <div className="cr-checkout-pro">
            {products.map((product, index) => (
              <div className="col-sm-12 mb-6" key={index}>
                <div className="cr-product-inner">
                  <div className="cr-pro-image-outer">
                    <div className="cr-pro-image">
                      <a href="product-left-sidebar.html" className="image">
                        <img className="main-image" src={product.images[0]} alt="Product" />
                      </a>
                    </div>
                  </div>
                  <div className="cr-pro-content cr-product-details">
                    <h5 className="cr-pro-title">
                      <a href="product-left-sidebar.html">{product.title}</a>
                    </h5>
                    <div className="cr-pro-rating">
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-line"></i>
                    </div>
                    <p className="cr-price">
                      <span className="new-price">{product.price}</span>{' '}
                      <span className="old-price">{product.oldPrice}</span>
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
