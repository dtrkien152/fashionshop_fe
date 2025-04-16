import { Swiper, SwiperSlide } from 'swiper/react';
import * as React from 'react';
import { IProductItemResponse } from '~/dto';
import { productService } from '~/services';
import { ROUTER_PATH } from '~/routes';
import { useNavigate } from 'react-router-dom';

interface Props {
  productId: number;
}

export default function RecommendProducts(props: Props) {
  const [products, setProducts] = React.useState<IProductItemResponse[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts();
  }, []);
  const handleNavigate = (productId: number) => {
    navigate(ROUTER_PATH.productDetail.extract.replace(':id', productId.toString()));
  };

  const fetchProducts = async () => {
    productService
      .getRecommendProduct(props.productId)
      .then((resp) => {
        console.log('cate ', resp.data);
        setProducts(resp.data.map((product) => ({...product, productName: product.name })));
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
                <h2>Sản phẩm liên quan</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>Những sản phẩm bạn có thể thích</p>
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
              {products?.map((product, index) => (
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
                    <div
                      className="cr-product-details"
                      onClick={() => handleNavigate(product.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="cr-brand">
                        <a>{product.branch}</a>
                      </div>
                      <a className="title max-2line">
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
