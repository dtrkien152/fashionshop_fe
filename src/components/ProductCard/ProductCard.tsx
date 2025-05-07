import * as React from 'react';
import { IProductItemResponse } from '~/dto';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';
import {OutOfStockTag} from "~/components/ProductCard/OutOfStockTag.tsx";
import RatingStars from "~/components/ProductRating/RatingStars.tsx";

interface Props {
  product: IProductItemResponse;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTER_PATH.productDetail.extract.replace(':id', product.id.toString()));
  };

  return (
    <div
      className="cr-product-box mb-24"
      onClick={handleNavigate} style={{ cursor: 'pointer' }}
    >
      <div className="cr-product-card">
        <div className="cr-product-image">
          <div className="cr-image-inner zoom-image-hover">
            <img src={product.thumbnailUrl} alt={product.productName} />
          </div>
          {product.unitInStocks === 0 && <OutOfStockTag />}
          {/*<div className="cr-side-view">*/}
          {/*  <a href="#" className="wishlist" onClick={(e) => e.preventDefault()}>*/}
          {/*    <i className="ri-heart-line"></i>*/}
          {/*  </a>*/}
          {/*  <a*/}
          {/*    className="model-oraganic-product"*/}
          {/*    data-bs-toggle="modal"*/}
          {/*    href="#quickview"*/}
          {/*    role="button"*/}
          {/*    onClick={(e) => e.preventDefault()}*/}
          {/*  >*/}
          {/*    <i className="ri-eye-line"></i>*/}
          {/*  </a>*/}
          {/*</div>*/}
          <a className="cr-shopping-bag" href="#" onClick={(e) => e.preventDefault()}>
            <i className="ri-shopping-bag-line"></i>
          </a>
        </div>
        <div className="cr-product-details">
          <div className="cr-brand">
            <a href="#">{product.category}</a>
          </div>
          <a style={{minHeight:48}} href="#" className="title max-2line" onClick={(e) => e.preventDefault()}>
            {product.productName}
          </a>

          {/*<p className="text">{product.productName}</p>*/}
          <p className="cr-price">
            <span className="new-price">{CurrencyUtils.formatCurrencyVND(product.salePrice)}</span>{' '}
            <span className="old-price">
                            {CurrencyUtils.formatCurrencyVND(product.originalPrice)}
                          </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
