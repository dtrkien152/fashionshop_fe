import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import TabComponent from '~/pages/Product/ProductDetail/components/TabComponent.tsx';
import { IProductDetailResponse, IProductSubDetailResponse } from '~/shared/model/product.model.ts';
import ProductAttributes from '~/pages/Product/ProductDetail/components/ProductAttributes.tsx';
import { CartDetailRequest, CartProduct } from '~/dto';
import { addToCart } from '~/shared/reducers/cartReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RootState } from '~/redux/store.ts';
import { cartService } from '~/services';

interface Props {
  products?: IProductDetailResponse;
}

const ProductSection = (props: Props) => {
  const dispatch = useDispatch();
  const { cartCode } = useSelector((state: RootState) => state.cart);
  const [productSubDetailSelected, setProductSubDetailSelected] =
    useState<IProductSubDetailResponse>();
  const [unit, setUnit] = useState(1);

  const [zoomStyle, setZoomStyle] = useState({});
  const imageContainerRef = useRef<any>(null);

  const onClickAddToCard = () => {
    if (!productSubDetailSelected) return;
    if (!props.products) return;
    console.log(cartCode);
    const payload = {
      products: [
        {
          productId: props.products.product_id,
          color: productSubDetailSelected.color,
          size: productSubDetailSelected.size,
          unit
        },
      ],
      cartCode: cartCode,
    } as CartDetailRequest;
    cartService.addToCartDetails(payload).then((res) => {
      console.log(res);
      const cartProduct: CartProduct = {
        productId: props.products?.product_id as number,
        productName: props.products?.productName as string,
        thumbnailUrl: props.products?.thumbnailUrl as string,
        salePrice: 0,
        originalPrice: 0,
        unit,
        color: productSubDetailSelected.color,
        size: productSubDetailSelected.size,
      };
      dispatch(addToCart(cartProduct));
      toast.success('Add product in cart successfully!');
    });
  };

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.05)', // Độ phóng to (có thể thay đổi)
    });
  };

  const handleProductSelected = (product?: IProductSubDetailResponse) => {
    setProductSubDetailSelected(product);
    console.log('Sản phẩm được chọn:', product);
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center',
    });
  };

  return (
    <section className="section-product padding-t-100">
      <div className="container">
        <div
          className="row mb-minus-24"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <div className="col-xxl-4 col-xl-5 col-md-6 col-12 mb-24">
            <div className="vehicle-detail-banner banner-content clearfix">
              <Swiper
                modules={[Thumbs]}
                spaceBetween={10}
                thumbs={{ autoScrollOffset: 1 }}
                className="banner-slider swiper-container"
              >
                {props.products?.imageUrls?.map((image, index) => (
                  <SwiperSlide className="slider slider-for" key={index}>
                    <div
                      className="slider-banner-image zoom-image-hover"
                      ref={imageContainerRef}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{ overflow: 'hidden' }}
                    >
                      <img
                        src={image}
                        alt={`product-tab-${index + 1}`}
                        className="product-image"
                        style={{
                          transition: 'transform 0.3s',
                          ...zoomStyle,
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper slidesPerView={4} spaceBetween={10} className="thumb-image slider-nav">
                {props.products?.imageUrls?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="thumbnail-image">
                      <div className="thumbImg">
                        <img src={image} alt={`thumb-${index + 1}`} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="col-xxl-8 col-xl-7 col-md-6 col-12 mb-24">
            <div className="cr-size-and-weight-contain">
              <h2 className="heading">{props.products?.productName}</h2>
              <p>{props.products?.description}</p>
            </div>
            <div className="cr-size-and-weight">
              <div className="cr-review-star">
                <div className="cr-star">
                  <i className="ri-fire-fill"></i>
                  <i className="ri-fire-fill"></i>
                  <i className="ri-fire-fill"></i>
                  <i className="ri-fire-fill"></i>
                  <i className="ri-fire-fill"></i>
                </div>
                <p>(Đã bán: {props.products?.unitOnOrder || 0} )</p>
              </div>
              <div className="list">
                <ul>
                  <li>
                    <label>
                      Brand <span>:</span>
                    </label>
                    ESTA BETTERU CO
                  </li>
                  <li>
                    <label>
                      Flavour <span>:</span>
                    </label>
                    Super Saver Pack
                  </li>
                  <li>
                    <label>
                      Diet Type <span>:</span>
                    </label>
                    Vegetarian
                  </li>
                  <li>
                    <label>
                      Weight <span>:</span>
                    </label>
                    200 Grams
                  </li>
                  <li>
                    <label>
                      Speciality <span>:</span>
                    </label>
                    Gluten Free, Sugar Free
                  </li>
                  <li>
                    <label>
                      Info <span>:</span>
                    </label>
                    Egg Free, Allergen-Free
                  </li>
                  <li>
                    <label>
                      Items <span>:</span>
                    </label>
                    1
                  </li>
                </ul>
              </div>
              <div className="cr-product-price">
                <span className="new-price">$120.25</span>
                <span className="old-price">$123.25</span>
              </div>
              <ProductAttributes
                productSubDetails={props.products?.productSubDetails || []}
                onSelect={handleProductSelected}
              />
              <div className="cr-add-card">
                <div className="cr-qty-main">
                  <input
                    type="text"
                    placeholder="."
                    value={unit}
                    minLength={1}
                    maxLength={20}
                    className="quantity"
                  />
                  <button type="button" className="plus" onClick={() => setUnit(unit + 1)}>
                    +
                  </button>
                  <button type="button" className="minus" onClick={() => setUnit(unit - 1)}>
                    -
                  </button>
                </div>
                <div className="cr-add-button">
                  <button
                    type="button"
                    className="cr-button cr-shopping-bag"
                    disabled={!productSubDetailSelected}
                    onClick={onClickAddToCard}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="cr-card-icon">
                  <a href="javascript:void(0)" className="wishlist">
                    <i className="ri-heart-line"></i>
                  </a>
                  <a
                    className="model-oraganic-product"
                    data-bs-toggle="modal"
                    href="#quickview"
                    role="button"
                  >
                    <i className="ri-eye-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TabComponent />
      </div>
    </section>
  );
};

export default ProductSection;
