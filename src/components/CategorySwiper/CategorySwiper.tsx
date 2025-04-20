// components/CategorySwiper.tsx
import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ICategoryModel } from '../../dto';
import { categoryService } from '~/services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySwiper: React.FC = () => {
  const [categories, setCategories] = React.useState<ICategoryModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearchByCategory=(catId:any)=>{
    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      searchParams.set('keyword', searchTerm);
    } else {
      searchParams.delete('keyword');
    }
    if(catId){
      searchParams.set('categoryId', catId);
      searchParams.set('page', '0'); // Reset về trang đầu tiên
    }
    navigate(`/product?${searchParams.toString()}`);
  }
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
            {categories.map((category: ICategoryModel, index) => (
              <SwiperSlide key={index}>
                <div className="category-block">
                  <div className="category-icon">
                    <img src={category.thumbnailUrl} alt={category.name} className="img-fluid" />
                  </div>
                  <div className="category-title" style={{cursor:'pointer'}}>
                    <h4>
                      <a onClick={()=>handleSearchByCategory(category.id)}>{category.name}</a>
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
