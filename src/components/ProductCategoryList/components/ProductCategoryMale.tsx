import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from '../../ProductCard/ProductCard.tsx';
import { useCountDown } from '~/hooks';
import { IProductItemResponse } from '~/dto';
import { productService } from '~/services';
import {FaArrowRight} from "react-icons/fa";

interface Props {}

interface Props {
  handleNavigate: (categoryId: number) => void;
}
const ProductCategoryFemale: React.FC<Props> = ({ handleNavigate }) => {
  const { days, hours, minutes, seconds } = useCountDown(7 * 24 * 60 * 60 * 1000);
  const [products, setProducts] = React.useState<IProductItemResponse[]>([]);
  React.useEffect(() => {
    fetchProducts().then();
  }, []);
  const fetchProducts = async () => {
    productService.getArrivalByCategory(1)
      .then((resp) => {
        setProducts(resp.data.data);
      })
      .catch((reason) => {
        console.log('error fetch product ', reason);
      });
  };

  return (
    <section className="section-product padding-b-100" data-aos="fade-up" data-aos-duration="2000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-2 mb-30">
              <div className="title-box">
                <div className="cr-banner">
                  <h2>Thời trang Nam </h2>
                </div>
                <div className="cr-banner-sub-title">
                  <p>Những sản pẩm thời trang nam có thể bạn sẽ thích.</p>
                </div>
              </div>
              {/*<div className="dealend-timer">*/}
              {/*  <div className="dealend-timer">*/}
              {/*    <div className="time-block">*/}
              {/*      <div className="time">{days}</div>*/}
              {/*      <span className="day">Ngày</span>*/}
              {/*    </div>*/}
              {/*    <div className="time-block">*/}
              {/*      <div className="time">{hours}</div>*/}
              {/*      <span className="dots">:</span>*/}
              {/*    </div>*/}
              {/*    <div className="time-block">*/}
              {/*      <div className="time">{minutes}</div>*/}
              {/*      <span className="dots">:</span>*/}
              {/*    </div>*/}
              {/*    <div className="time-block">*/}
              {/*      <div className="time">{seconds}</div>*/}
              {/*      <span className="dots"></span>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <Swiper
            modules={[Autoplay]}
            style={{marginBottom:'1px'}}
            slidesPerView={1}
            speed={2000}
            effect="slide"
            loop={true}
            parallax={true}
            spaceBetween={24}
            breakpoints={{
              0: {slidesPerView: 1},
              576: {slidesPerView: 2},
              768: {slidesPerView: 3},
              1200: {slidesPerView: 4},
              1400: {slidesPerView: 5},
            }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            className={'new-product-slider swiper-container mb-minus-24'}
        >
          {products &&
              products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard product={product}/>
                  </SwiperSlide>
              ))}
        </Swiper>
        <div
            className="text-primary cursor-pointer flex items-center gap-1"
            onClick={() => handleNavigate(1)}
        >
          <span>Xem thêm</span>
          <FaArrowRight/>
        </div>
      </div>
    </section>
  );
};
export default ProductCategoryFemale;
