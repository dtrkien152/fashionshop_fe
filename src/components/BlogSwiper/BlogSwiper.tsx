import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { IMAGES } from '~/images';

interface Props {}

const BlogSwiper: React.FC<Props> = () => {
  const blogs = [
    {
      id: 1,
      img: IMAGES.blog.image4,
      date: '10',
      month: 'oct',
      author: 'By Admin',
      category: 'Snacks',
      title: 'Urna pretium elit mauris cursus at elit Vestibulum.',
      link: 'blog-detail-left-sidebar.html',
    },
    {
      id: 2,
      img: IMAGES.blog.image5,
      date: '09',
      month: 'sep',
      author: 'By Admin',
      category: 'Food',
      title: 'Best guide to Shopping for organic ingredients.',
      link: 'blog-detail-left-sidebar.html',
    },
    {
      id: 3,
      img: IMAGES.blog.image6,
      date: '12',
      month: 'oct',
      author: 'By Admin',
      category: 'Snacks',
      title: 'Cursus at elit vestibulum urna pretium elit mauris.',
      link: 'blog-detail-left-sidebar.html',
    },
    {
      id: 4,
      img: IMAGES.blog.image7,
      date: '22',
      month: 'jan',
      author: 'By Admin',
      category: 'Vegetable',
      title: 'Condimentum Nam enim bestMorbi odio sodales.',
      link: 'blog-detail-left-sidebar.html',
    },
  ];

  return (
    <section className="section-blog padding-b-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000">
              <div className="cr-banner">
                <h2>Latest News</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore lacus vel facilisis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" data-aos="fade-up" data-aos-duration="2000">
          <div className="col-lg-12">
            <Swiper
              modules={[A11y]}
              spaceBetween={24}
              loop={true}
              slidesPerView={3}
              breakpoints={{
                1600: { slidesPerView: 4, spaceBetween: 24 },
                991: { slidesPerView: 3, spaceBetween: 24 },
                576: { slidesPerView: 2, spaceBetween: 24 },
                0: { slidesPerView: 1, spaceBetween: 10 },
              }}
              className="cr-blog-slider swiper-container"
            >
              {blogs.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className="cr-blog">
                    <div className="cr-blog-image">
                      <img src={post.img} alt={post.title} />
                      <div className="cr-blog-date">
                        <span>
                          {post.date}
                          <code>{post.month}</code>
                        </span>
                      </div>
                    </div>
                    <div className="cr-blog-content">
                      <span>
                        <code>{post.author}</code> |{' '}
                        <a href="blog-left-sidebar.html">{post.category}</a>
                      </span>
                      <h5>{post.title}</h5>
                      <a className="read" href={post.link}>
                        Read More
                      </a>
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
export default BlogSwiper;
