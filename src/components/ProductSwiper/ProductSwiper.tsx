import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IMAGES } from '~/images';
import { Autoplay } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard.tsx';
import { useCountDown } from '~/hooks';

interface Props {}

const ProductSwiper: React.FC<Props> = () => {
  const { days, hours, minutes, seconds } = useCountDown(7 * 24 * 60 * 60 * 1000);
  const products = [
    {
      id: 1,
      category: 'Women Tops',
      title: 'Colorful top for women',
      price: '$6.00',
      oldPrice: '$9.00',
      flag: {
        type: 'sale',
        value: '50% Sale',
      },
      images: [IMAGES.product.image18, IMAGES.product.image19],
      colors: ['#74c7ff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
    {
      id: 2,
      category: 'Men T-shirt',
      title: 'Blue T-shirt for men',
      price: '$11.00',
      oldPrice: '$22.00',
      flag: {
        type: 'trending',
        value: 'Trending',
      },
      images: [IMAGES.product.image30, IMAGES.product.image29],
      colors: ['#74c7ff'],
      size: ['M', 'XL'],
    },
    {
      id: 3,
      category: 'Kids',
      title: 'Pink T-shirt for girl',
      price: '$29.00',
      oldPrice: '$39.00',
      images: [IMAGES.product.image24, IMAGES.product.image25],
      colors: ['#74c7ff', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 4,
      category: 'Shorts',
      title: 'Girl nightdress shorts',
      price: '$57.00',
      oldPrice: '$62.00',
      flag: {
        type: 'new',
        value: 'New',
      },
      images: [IMAGES.product.image20, IMAGES.product.image21],
      colors: ['#50aae7', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 5,
      category: 'T-shirt',
      title: 'Black T-shirt for women',
      price: '$35.00',
      oldPrice: '$42.00',
      images: [IMAGES.product.image22, IMAGES.product.image23],
      colors: ['#000000', '#837aff'],
      size: ['S', 'M'],
    },
    {
      id: 6,
      category: 'Women Tops',
      title: 'Colorful top for women',
      price: '$6.00',
      oldPrice: '$9.00',
      flag: {
        type: 'sale',
        value: '50% Sale',
      },
      images: [IMAGES.product.image18, IMAGES.product.image19],
      colors: ['#74c7ff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
    {
      id: 7,
      category: 'Men T-shirt',
      title: 'Blue T-shirt for men',
      price: '$11.00',
      oldPrice: '$22.00',
      flag: {
        type: 'trending',
        value: 'Trending',
      },
      images: [IMAGES.product.image30, IMAGES.product.image29],
      colors: ['#74c7ff'],
      size: ['M', 'XL'],
    },
    {
      id: 8,
      category: 'Kids',
      title: 'Pink T-shirt for girl',
      price: '$29.00',
      oldPrice: '$39.00',
      images: [IMAGES.product.image24, IMAGES.product.image25],
      colors: ['#74c7ff', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 9,
      category: 'Shorts',
      title: 'Girl nightdress shorts',
      price: '$57.00',
      oldPrice: '$62.00',
      flag: {
        type: 'new',
        value: 'New',
      },
      images: [IMAGES.product.image20, IMAGES.product.image21],
      colors: ['#50aae7', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 10,
      category: 'T-shirt',
      title: 'Black T-shirt for women',
      price: '$35.00',
      oldPrice: '$42.00',
      images: [IMAGES.product.image22, IMAGES.product.image23],
      colors: ['#000000', '#837aff'],
      size: ['S', 'M'],
    },
  ];

  return (
    <section className="section-product padding-b-100" data-aos="fade-up" data-aos-duration="2000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-2 mb-30">
              <div className="title-box">
                <div className="cr-banner">
                  <h2>New Arrivals</h2>
                </div>
                <div className="cr-banner-sub-title">
                  <p>Browse The Collection of Top Products.</p>
                </div>
              </div>
              <div className="dealend-timer">
                <div className="dealend-timer">
                  <div className="time-block">
                    <div className="time">{days}</div>
                    <span className="day">Days</span>
                  </div>
                  <div className="time-block">
                    <div className="time">{hours}</div>
                    <span className="dots">:</span>
                  </div>
                  <div className="time-block">
                    <div className="time">{minutes}</div>
                    <span className="dots">:</span>
                  </div>
                  <div className="time-block">
                    <div className="time">{seconds}</div>
                    <span className="dots"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          speed={2000}
          effect="slide"
          loop={true}
          parallax={true}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1400: { slidesPerView: 5 },
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          className={'new-product-slider swiper-container mb-minus-24'}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default ProductSwiper;
