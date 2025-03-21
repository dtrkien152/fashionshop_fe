import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { IMAGES } from '~/images';
import postService from '~/services/post.service.ts';
import { IPostWithComments } from '~/dto/post.dto.ts';
import { Tooltip } from 'antd';

const BlogSwiper: React.FC = () => {
  const [posts, setPosts] = useState<IPostWithComments[]>([]);

  useEffect(() => {
    postService
      .top5lastest()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching latest posts:', error);
      });
  }, []);

  return (
    <section className="section-blog padding-b-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000">
              <div className="cr-banner">
                <h2>Tin tức mới nhất </h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>Tin Tức Mới Nhất – Những Câu Chuyện Đang Được Quan Tâm Nhất .</p>
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
              className="cr-blog-slider swiper-container "
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className="cr-blog">
                    <div className="cr-blog-image blog-container-cus">
                      <img src={post.thumbnailUrl || IMAGES.blog.image4} alt={post.title} />
                      <div className="cr-blog-date">
                        <span>
                          {new Date(post.createdAt).getDate()}
                          <code>
                            {new Date(post.createdAt).toLocaleString('en', { month: 'short' })}
                          </code>
                        </span>
                      </div>
                    </div>
                    <div className="cr-blog-content">
                      <span>
                        <code>{post.author || 'Unknown'}</code> |{' '}
                        <a href="blog-left-sidebar.html">{post.categoryName || 'Uncategorized'}</a>
                      </span>
                      <h5 className="truncate-title">
                        <Tooltip title={post.title} placement="top">
                          {post.title}
                        </Tooltip>
                      </h5>
                      <a className="read" href={`/blogs/${post.code}`}>
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
