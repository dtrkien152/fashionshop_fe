import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';

interface Props {}
const HeroSwiper: React.FC<Props> = () => {
  return (
    <section className="section-hero hero-2 padding-b-100">
      <div className="container-fluid p-0">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          centeredSlides={true}
          speed={2000}
          effect="slide"
          parallax={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="cr-slider swiper-container swiper-container-horizontal"
        >
          <SwiperSlide>
            <div className="cr-hero-banner cr-banner-image-two">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cr-left-side-contain slider-animation">
                      <h5>
                        <span>100%</span> Cotton Fabric
                      </h5>
                      <h1>Đón đầu xu hướng – Tỏa sáng phong cách riêng!</h1>
                      <p>
                        Khám phá bộ sưu tập mới nhất dành riêng cho phái đẹp, giúp bạn nổi bật ở mọi khoảnh khắc.
                      </p>
                      <div className="cr-last-buttons">
                        <Link to={ROUTER_PATH.productList.extract} className="cr-button">
                          Mua sắm ngay
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="cr-hero-banner cr-banner-image-one">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cr-left-side-contain slider-animation">
                      <h5>
                        <span>100%</span> Vải Cotton Thoáng Mát
                      </h5>
                      <h1>Khám Phá Ưu Đãi Jeans Mùa Hè</h1>
                      <p>
                        Chất liệu thoáng mát, kiểu dáng thời thượng – hoàn hảo cho mùa hè sôi động!
                      </p>
                      <p>
                        Ưu đãi hấp dẫn chỉ có trong mùa này, đừng bỏ lỡ!
                      </p>
                      <div className="cr-last-buttons">
                        <Link to={ROUTER_PATH.productList.extract} className="cr-button">
                          Mua sắm ngay
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
export default HeroSwiper;