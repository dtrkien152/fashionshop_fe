import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface Props {}
const CategorySwiper: React.FC<Props> = () => {
  const categories = [
    { icon: 'fi fi-tr-shirt-long-sleeve', title: 'Shirt', items: 67 },
    { icon: 'fi fi-tr-hat-cowboy-side', title: 'Hats', items: 81 },
    { icon: 'fi fi-tr-boot-heeled', title: 'Boot', items: 32 },
    { icon: 'fi fi-tr-shirt-tank-top', title: 'Tops', items: 78 },
    { icon: 'fi fi-tr-vest', title: 'Vest', items: 64 },
    { icon: 'fi fi-tr-socks', title: 'Socks', items: 24 },
    { icon: 'fi fi-tr-sunglasses', title: 'Sunglasses', items: 46 },
  ];

  return (
    <section className="section-popular margin-b-100" data-aos="fade-up" data-aos-duration="2000">
      <div className="container">
        <div className="row">
          <div className="title-2 mb-30 d-none">
            <h2>Categories</h2>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            speed={2000}
            effect="slide"
            loop={true}
            parallax={true}
            breakpoints={{
              380: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
              1400: { slidesPerView: 6 },
            }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            className="category-slider swiper-container"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="category-block">
                  <div className={`category-icon icon-${index + 1}`}>
                    <i className={category.icon}></i>
                  </div>
                  <div className="category-title">
                    <h4>
                      <a href="shop-left-sidebar.html">{category.title}</a>
                    </h4>
                    <p>({category.items} Items)</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default CategorySwiper;