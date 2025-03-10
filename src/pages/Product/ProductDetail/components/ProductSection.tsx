import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import TabComponent from '~/pages/Product/ProductDetail/components/TabComponent.tsx';
import { IProductDetailResponse, IProductSubDetailResponse } from '~/shared/model/product.model.ts';
import ProductAttributes from '~/pages/Product/ProductDetail/components/ProductAttributes.tsx';


interface Props {
  products: IProductDetailResponse|null;
}
const ProductSection = (props:Props) => {
  // const images = [
  //   IMAGES.product.image9,
  //   IMAGES.product.image10,
  //   IMAGES.product.image11,
  //   IMAGES.product.image12,
  //   IMAGES.product.image13,
  //   IMAGES.product.image14,
  //   IMAGES.product.image16,
  // ];

  const [zoomStyle, setZoomStyle] = useState({});
  const imageContainerRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState<IProductSubDetailResponse | null>(null);

  const handleMouseMove = (e) => {
    // @ts-ignore
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.05)', // Độ phóng to (có thể thay đổi)
    });
  };

  const handleProductSelect = (product: IProductSubDetailResponse | null) => {
    setSelectedProduct(product);
    console.log("Sản phẩm được chọn:", product);
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
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                navigation
                thumbs={{ autoScrollOffset: 1 }}
                className="banner-slider"
              >
                {props.products?.imageUrls?.map((image, index) => (
                  <SwiperSlide key={index}>
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
              <h2 className="heading">
                {props.products?.productName}
              </h2>
              <p>
                {props.products?.description}
              </p>
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
                <p>(Đã bán: {props.products?.unitOnOrder||0} )</p>
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
              <div className="cr-size-weight">
                {/*<h5>*/}
                {/*  <span>Size</span>/<span>Weight</span> :*/}
                {/*</h5>*/}
                {/*<div className="cr-kg">*/}
                {/*  <ul>*/}
                {/*    <li className="active-color">50kg</li>*/}
                {/*    <li>80kg</li>*/}
                {/*    <li>120kg</li>*/}
                {/*    <li>200kg</li>*/}
                {/*  </ul>*/}
                {/*</div>*/}
                <ProductAttributes
                  productSubDetails={props.products?.productSubDetails || []}
                  onSelect={handleProductSelect}
                />
              </div>
              <div className="cr-add-card">
                <div className="cr-qty-main">
                  <input
                    type="text"
                    placeholder="."
                    value="1"
                    minLength={1}
                    maxLength={20}
                    className="quantity"
                  />
                  <button type="button" className="plus">
                    +
                  </button>
                  <button type="button" className="minus">
                    -
                  </button>
                </div>
                <div className="cr-add-button">
                  <button type="button" className="cr-button cr-shopping-bag">
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
