import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface Props {}

const ServiceBox: React.FC<Props> = () => {
  const services = [
    {
      icon: 'ri-red-packet-line',
      title: 'Product Packing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
    {
      icon: 'ri-customer-service-2-line',
      title: '24X7 Support',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
    {
      icon: 'ri-truck-line',
      title: 'Delivery in 5 Days',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
    {
      icon: 'ri-money-dollar-box-line',
      title: 'Payment Secure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
  ];

  return (
    <section className="section-services padding-b-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cr-services-border" data-aos="fade-up" data-aos-duration="2000">
              <Swiper
                loop={true}
                spaceBetween={24}
                pagination={{ clickable: true }}
                breakpoints={{
                  1399: { slidesPerView: 4, spaceBetween: 24 },
                  1028: { slidesPerView: 3, spaceBetween: 24 },
                  480: { slidesPerView: 2, spaceBetween: 24 },
                  0: { slidesPerView: 1, spaceBetween: 10 },
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="cr-service-slider swiper-container"
              >
                {services.map((service, index) => (
                  <SwiperSlide key={index}>
                    <div className="cr-services">
                      <div className="cr-services-image">
                        <i className={service.icon}></i>
                      </div>
                      <div className="cr-services-contain">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBox;