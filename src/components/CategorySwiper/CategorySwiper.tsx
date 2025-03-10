// components/CategorySwiper.tsx
import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ICategoryModel } from '../../dto';
import { categoryService } from '~/services';

const CategorySwiper: React.FC = () => {
  const [categories, setCategories] = React.useState<ICategoryModel[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

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
            {categories.map((category: ICategoryModel) => (
              <SwiperSlide key={category.id}>
                <div className="category-block">
                  <div className="category-icon">
                    <img src={category.thumbnailUrl} alt={category.name} className="img-fluid" />
                  </div>
                  <div className="category-title">
                    <h4>
                      <a href="shop-left-sidebar.html">{category.name}</a>
                    </h4>
                    <p>{category.code}</p>
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
