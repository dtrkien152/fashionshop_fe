import * as React from 'react';

interface Props {
  category: string;
  title: string;
  price: string;
  oldPrice: string;
  flag?: {
    type: string;
    value: string;
  };
  images: string[];
  colors: string[];
  size: string[];
}

const ProductCard: React.FC<Props> = (props) => {
  return (
    <div className="product-card-2">
      <div className="cr-product-inner">
        <div className="cr-pro-image-outer">
          <div className="cr-pro-image">
            <a href="product-left-sidebar.html" className="image">
              <img className="main-image" src={props.images[0]} alt="Product" />
              <img className="hover-image" src={props.images[1]} alt="Product" />
            </a>
            {props.flag && (
              <span className="flags">
                <span className={props.flag.type}>{props.flag.value}</span>
              </span>
            )}
            <div className="cr-pro-actions">
              <a
                className="model-oraganic-product"
                data-bs-toggle="modal"
                href="#quickview"
                role="button"
              >
                <i className="ri-eye-line"></i>
              </a>
              <a href="compare.html" className="cr-btn-group compare" title="Compare">
                <i className="mdi mdi-vector-arrange-below"></i>
              </a>
              <a
                href="javascript:void(0)"
                title="Add To Cart"
                className="add-to-cart cr-shopping-bag"
              >
                <i className="ri-shopping-cart-line"></i>
              </a>
              <a href="javascript:void(0)" className="cr-btn-group wishlist" title="Wishlist">
                <i className="ri-heart-line"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="cr-pro-content">
          <div className="cr-info">
            <a href="shop-left-sidebar.html">{props.category}</a>
          </div>
          <h5 className="cr-pro-title">
            <a href="product-left-sidebar.html">{props.title}</a>
          </h5>
          <span className="cr-price">
            <span className="new-price">{props.price}</span>
            <span className="old-price">{props.oldPrice}</span>
          </span>
          <div className="cr-pro-option">
            <div className="cr-pro-color">
              <ul className="cr-opt-swatch cr-change-img">
                {props.colors &&
                  props.colors.map((color, index) => (
                    <li key={index} className={index === 0 ? 'active' : ''}>
                      <a href="javascript:void(0)" className="cr-opt-clr-img">
                        <span style={{ backgroundColor: color }}></span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="cr-pro-size">
              <ul className="cr-opt-size">
                {props.size &&
                  props.size.map((size, index) => (
                    <li key={index} className={index === 0 ? 'active' : ''}>
                      <a href="#" className="cr-opt-sz">
                        {size}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
