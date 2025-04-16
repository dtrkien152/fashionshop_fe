import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface Props {}

const ServiceBox: React.FC<Props> = () => {
  const services = [
    {
      icon: 'ri-red-packet-line',
      title: 'Đóng Gói Sản Phẩm',
      description: 'Sản phẩm được đóng gói cẩn thận, đảm bảo an toàn khi vận chuyển.',
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc.',
    },
    {
      icon: 'ri-truck-line',
      title: 'Giao Hàng Trong 5 Ngày',
      description: 'Nhanh chóng – đúng hẹn – tiện lợi trên toàn quốc.',
    },
    {
      icon: 'ri-money-dollar-box-line',
      title: 'Thanh Toán An Toàn',
      description: 'Bảo mật tuyệt đối, đa dạng hình thức thanh toán tiện lợi.',
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