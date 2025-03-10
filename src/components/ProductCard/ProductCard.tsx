import * as React from 'react';
import { IProductItemResponse } from '~/shared/model/product.model.ts';

interface Props {
  product: IProductItemResponse;
}

const ProductCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="product-card-2">
      <div className="cr-product-inner">
        <div className="cr-pro-image-outer">
          <div className="cr-pro-image">
            <a href="product-left-sidebar.html" className="image">
              <img className="main-image" src={props.product.thumbnailUrl} alt="Product" />
            </a>
            {props.product?.flag && (
              <span className="flags">
                <span className={props.product.flag.type}>{props.product.flag.value}</span>
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
            <a href="shop-left-sidebar.html">{props.product?.category}</a>
          </div>
          <h5 className="cr-pro-title">
            <a href="product-left-sidebar.html">{props.product?.productName}</a>
          </h5>
          <span className="cr-price">
            <span className="new-price">{props.product?.salePrice}</span>
            <span className="old-price">{props.product?.originalPrice}</span>
          </span>
          <div className="cr-pro-option">
            <div className="cr-pro-color">
              <ul className="cr-opt-swatch cr-change-img">
                {props.product?.colors &&
                  props.product.colors.map((color, index) => (
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
                {props.product?.size &&
                  props.product.size.map((size, index) => (
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
