import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export const ProductListBreadcrumb=()=> {
  const slides = [
    { title: 'Shop', link: 'index.html', breadcrumb: 'Home - Shop' },
    { title: 'Products', link: 'products.html', breadcrumb: 'Home - Products' },
    { title: 'Sales', link: 'sales.html', breadcrumb: 'Home - Sales' },
  ];

  return (
    <section className="section-breadcrumb">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="cr-breadcrumb-image">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cr-breadcrumb-title">
                      <h2>{slide.title}</h2>
                      <span>
                        <a href={slide.link}>Home</a> - {slide.breadcrumb}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
