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
                      <h1>Fashion sale for women's.</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis
                        beatae consequuntur.
                      </p>
                      <div className="cr-last-buttons">
                        <Link to={ROUTER_PATH.productList.extract} className="cr-button">
                          shop now
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
                        <span>100%</span> Cotton Fabric
                      </h5>
                      <h1>Explore jeans summer sale.</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis
                        beatae consequuntur.
                      </p>
                      <div className="cr-last-buttons">
                        <Link to={ROUTER_PATH.productList.extract} className="cr-button">
                          shop now
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