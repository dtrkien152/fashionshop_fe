import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { IMAGES } from '~/images';
import { ROUTER_PATH } from '~/routes';
import { Link } from 'react-router-dom';

interface Props {}
const ProductBanner: React.FC<Props> = () => {
  const banners = [
    {
      img: IMAGES.productBanner.image4,
      title: 'Womens Summer Fashion',
      discount: '25%',
      text: 'on first order',
    },
    {
      img: IMAGES.productBanner.image5,
      title: 'Cotton Jacket for mens',
      discount: '33%',
      text: 'on first order',
    },
    {
      img: IMAGES.productBanner.image6,
      title: 'Children Latest Fashion',
      discount: '15%',
      text: 'on first order',
    },
    {
      img: IMAGES.productBanner.image4,
      title: 'Womens Summer Fashion',
      discount: '25%',
      text: 'on first order',
    },
    {
      img: IMAGES.productBanner.image5,
      title: 'Cotton Jacket for mens',
      discount: '33%',
      text: 'on first order',
    },
    {
      img: IMAGES.productBanner.image6,
      title: 'Children Latest Fashion',
      discount: '15%',
      text: 'on first order',
    },
  ];
  return (
    <section className="section-product-banner padding-b-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                1200: { slidesPerView: 3, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                0: { slidesPerView: 1, spaceBetween: 10 },
              }}
              className="cr-banner-slider swiper-container"
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                  <div className="cr-product-banner-image">
                    <img src={banner.img} alt="product-banner" />
                    <div className="cr-product-banner-contain">
                      <h5
                        dangerouslySetInnerHTML={{ __html: banner.title.replace(' ', '<br />') }}
                      />
                      <p>
                        <span className="percent">{banner.discount}</span> Off
                        <span className="text"> {banner.text}</span>
                      </p>
                      <div className="cr-product-banner-buttons">
                        <Link to={ROUTER_PATH.productList.extract} className="cr-button">
                          shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductBanner;