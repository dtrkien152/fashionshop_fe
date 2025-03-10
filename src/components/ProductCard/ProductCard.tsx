import * as React from 'react';
import { IProductItemResponse } from '~/shared/model/product.model';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: IProductItemResponse;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?.id}`);
  };

  return (
    <div className="product-card-2" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <div className="cr-product-inner">
        <div className="cr-pro-image-outer">
          <div className="cr-pro-image">
            <div className="image">
              <img className="main-image" src={product.thumbnailUrl} alt="Product" />
              {/*<img className="hover-image" src={product?.images[1] || ''} alt="Product" />*/}
            </div>
            {product?.flag && (
              <span className="flags">
                <span className={product.flag.type}>{product.flag.value}</span>
              </span>
            )}
            <div className="cr-pro-actions">
              <a
                className="model-oraganic-product"
                data-bs-toggle="modal"
                role="button"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="ri-eye-line"></i>
              </a>
              <a
                className="cr-btn-group compare"
                title="Compare"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="mdi mdi-vector-arrange-below"></i>
              </a>
              <a
                title="Add To Cart"
                className="add-to-cart cr-shopping-bag"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="ri-shopping-cart-line"></i>
              </a>
              <a
                className="cr-btn-group wishlist"
                title="Wishlist"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="ri-heart-line"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="cr-pro-content">
          <div className="cr-info">
            <span>{product?.category}</span>
          </div>
          <h5 className="cr-pro-title">
            <span>{product?.productName}</span>
          </h5>
          <span className="cr-price">
            <span className="new-price">{product?.salePrice}</span>
            <span className="old-price">{product?.originalPrice}</span>
          </span>
          <div className="cr-pro-option">
            <div className="cr-pro-color">
              <ul className="cr-opt-swatch cr-change-img">
                {product?.colors?.map((color, index) => (
                  <li key={index} className={index === 0 ? 'active' : ''}>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      className="cr-opt-clr-img"
                    >
                      <span style={{ backgroundColor: color }}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cr-pro-size">
              <ul className="cr-opt-size">
                {product?.size?.map((size, index) => (
                  <li key={index} className={index === 0 ? 'active' : ''}>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      className="cr-opt-sz"
                    >
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
