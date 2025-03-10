import { Swiper, SwiperSlide } from 'swiper/react';
import { IMAGES } from '~/images';
import * as React from "react";
import {IProductItemResponse} from "~/shared/model/product.model.ts";
import {productService} from "~/services";

// const products = [
//   {
//     img: IMAGES.product.image9,
//     category: 'Snacks',
//     rating: 4.5,
//     title: 'Best snakes with hazel nut mix pack 200gm',
//     newPrice: '$120.25',
//     oldPrice: '$123.25',
//   },
//   {
//     img: IMAGES.product.image10,
//     category: 'Snacks',
//     rating: 5.0,
//     title: 'Sweet snakes crunchy nut mix 250gm pack',
//     newPrice: '$100.00',
//     oldPrice: '$110.00',
//   },
//   {
//     img: IMAGES.product.image11,
//     category: 'Snacks',
//     rating: 4.5,
//     title: 'Best snakes with hazel nut mix pack 200gm',
//     newPrice: '$120.25',
//     oldPrice: '$123.25',
//   },
//   {
//     img: IMAGES.product.image12,
//     category: 'Snacks',
//     rating: 5.0,
//     title: 'Sweet snakes crunchy nut mix 250gm pack',
//     newPrice: '$100.00',
//     oldPrice: '$110.00',
//   },
//   {
//     img: IMAGES.product.image13,
//     category: 'Snacks',
//     rating: 5.0,
//     title: 'Sweet snakes crunchy nut mix 250gm pack',
//     newPrice: '$100.00',
//     oldPrice: '$110.00',
//   },
// ];

export default function PopularProducts() {
  const [products, setProducts] = React.useState<IProductItemResponse[]>([]);
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    productService
        .getTopSelling()
        .then((resp) => {
          setProducts(resp.data.data);
        })
        .catch((reason) => {
          console.log('error fetch product ', reason);
        });
  };
  return (
    <section
      className="section-popular-products padding-tb-100"
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-delay="400"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-30">
              <div className="cr-banner">
                <h2>Popular Products</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et viverra maecenas accumsan lacus vel facilisis.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              className="cr-popular-product swiper-container"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src={product.thumbnailUrl} alt={product.productName} />
                      </div>
                      <div className="cr-side-view">
                        <a href="#" className="wishlist">
                          <i className="ri-heart-line"></i>
                        </a>
                        <a
                          className="model-oraganic-product"
                          data-bs-toggle="modal"
                          href="#quickview"
                          role="button"
                        >
                          <i className="ri-eye-line"></i>
                        </a>
                      </div>
                      <a className="cr-shopping-bag" href="#">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a >{product.category}</a>
                        {/*<div className="cr-star">*/}
                        {/*  {Array.from({ length: 5 }, (_, i) => (*/}
                        {/*    <i*/}
                        {/*      key={i}*/}
                        {/*      className={i < product.rating ? 'ri-star-fill' : 'ri-star-line'}*/}
                        {/*    ></i>*/}
                        {/*  ))}*/}
                        {/*  <p>({product.rating.toFixed(1)})</p>*/}
                        {/*</div>*/}
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        {product.productName}
                      </a>
                      <p className="cr-price">
                        <span className="new-price">{product.originalPrice}</span>{' '}
                        <span className="old-price">{product.salePrice}</span>
                      </p>
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
}
