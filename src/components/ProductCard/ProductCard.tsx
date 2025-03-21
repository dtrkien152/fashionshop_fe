import * as React from 'react';
import { IProductItemResponse } from '~/dto';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';

interface Props {
  product: IProductItemResponse;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { cartCode } = useSelector((state: RootState) => state.cart);
  // const [colorSelected, setColorSelected] = useState<string>(product.colors[0]);
  // const [sizeSelected, setSizeSelected] = useState<string>(product.size[0]);
  //
  // const onClickAddToCard = () => {
  //   const payload = {
  //     products: [
  //       {
  //         productId: product.id,
  //         color: colorSelected,
  //         size: sizeSelected,
  //         unit: 1
  //       },
  //     ],
  //     cartCode: cartCode,
  //   } as CartDetailRequest;
  //   cartService.addToCartDetails(payload).then(() => {
  //     const cartProduct: CartProduct = {
  //       productId: product.id,
  //       productName: product.productName,
  //       thumbnailUrl: product.thumbnailUrl,
  //       salePrice: product.salePrice,
  //       originalPrice: product.originalPrice,
  //       unit: 1,
  //       color: colorSelected,
  //       size: sizeSelected,
  //     };
  //     console.log(cartProduct);
  //     dispatch(addToCart(cartProduct));
  //     toast.success('Add product in cart successfully!');
  //   });
  // };

  const handleNavigate = () => {
    navigate(ROUTER_PATH.productDetail.extract.replace(':id', product.id.toString()));
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
                title="Add To Cart"
                className="add-to-cart cr-shopping-bag"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
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
            <span className="new-price">{CurrencyUtils.formatCurrencyVND(product?.salePrice)}</span>
            <span className="old-price">
              {CurrencyUtils.formatCurrencyVND(product?.originalPrice)}
            </span>
          </span>
          {/*<div className="cr-pro-option">*/}
          {/*  <div className="cr-pro-color">*/}
          {/*    <ul className="cr-opt-swatch cr-change-img">*/}
          {/*      {product?.colors?.map((color, index) => (*/}
          {/*        <li key={index} className={color === colorSelected ? 'active' : ''}>*/}
          {/*          <a onClick={() => setColorSelected(color)} className="cr-opt-clr-img">*/}
          {/*            <span style={{ backgroundColor: color }}></span>*/}
          {/*          </a>*/}
          {/*        </li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*  <div className="cr-pro-size">*/}
          {/*    <ul className="cr-opt-size">*/}
          {/*      {product?.size?.map((size, index) => (*/}
          {/*        <li key={index} className={size === sizeSelected ? 'active' : ''}>*/}
          {/*          <a onClick={() => setSizeSelected(size)} className="cr-opt-sz">*/}
          {/*            {size}*/}
          {/*          </a>*/}
          {/*        </li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
