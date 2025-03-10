import * as React from 'react';
import { ProductCard } from '~/components';
import { IProductItemResponse } from '~/shared/model/product.model.ts';
import { productService } from '~/services';

interface Props {}

const ProductCollection: React.FC<Props> = () => {
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
    <section className="cr-product-tab cr-products padding-b-100 wow fadeInUp">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-duration="2000">
          <div className="col-lg-12">
            <div className="title-2 mb-30">
              <div className="title-box">
                <div className="cr-banner">
                  <h2>Top Collection</h2>
                </div>
                <div className="cr-banner-sub-title">
                  <p>Shop online for top collection and get free shipping!</p>
                </div>
              </div>
              <div className="cr-pro-tab">
                <ul className="cr-pro-tab-nav nav">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#all">
                      All
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#womens">
                      Womens
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#mens">
                      Mens
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#kids">
                      Kids
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-minus-24" data-aos="fade-up" data-aos-duration="2000">
          <div className="col">
            <div className="tab-content">
              <div className="tab-pane fade show active product-block" id="all">
                <div className="row">
                  {products.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard product={item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="womens">
                <div className="row">
                  {products.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard product={item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="mens">
                <div className="row">
                  {products.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard product={item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="kids">
                <div className="row">
                  {products.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard product={item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;
