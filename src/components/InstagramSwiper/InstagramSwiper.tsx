import * as React from 'react';
import { IMAGES } from '~/images';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {}

const InstagramSwiper: React.FC<Props> = () => {
  const images = [
    IMAGES.instagram.image9,
    IMAGES.instagram.image10,
    IMAGES.instagram.image11,
    IMAGES.instagram.image12,
    IMAGES.instagram.image13,
    IMAGES.instagram.image14,
    IMAGES.instagram.image15,
    IMAGES.instagram.image16,
    IMAGES.instagram.image9,
    IMAGES.instagram.image10,
    IMAGES.instagram.image11,
    IMAGES.instagram.image12,
    IMAGES.instagram.image13,
    IMAGES.instagram.image14,
    IMAGES.instagram.image15,
    IMAGES.instagram.image16,
  ];

  return (
    <section className="section-insta padding-b-100" data-aos="fade-up" data-aos-duration="2000">
      <div className="container">
        <h2 className="d-none">@Instagram</h2>
        <Swiper
          speed={500}
          spaceBetween={24}
          autoplay={false}
          loop={true}
          allowTouchMove={true}
          centeredSlides={false}
          breakpoints={{
            420: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
            1400: { slidesPerView: 8 },
          }}
          modules={[FreeMode]}
          className="cr-insta swiper-container"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <a href="#" className="cr-insta-image">
                <img src={src} alt="insta" />
                <div className="insta-overlay"></div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default InstagramSwiper;
