import * as React from 'react';
import { ProductCard } from '~/components';
import { IMAGES } from '~/images';

interface Props {}

const ProductCollection: React.FC<Props> = () => {
  const all = [
    {
      category: 'Women Tops',
      title: 'Pink T-shirt for women',
      price: '$7.00',
      oldPrice: '$9.00',
      flag: {
        type: 'sale',
        value: '50% Sale',
      },
      images: [IMAGES.product.image33, IMAGES.product.image34],
      colors: ['#74c7ff', '#f39fab', '#85ffeb'],
      size: ['S', 'L'],
    },
    {
      category: 'T-shirt',
      title: 'Blue T-Shirt for men',
      price: '$125.00',
      oldPrice: '$250.00',
      images: [IMAGES.product.image30, IMAGES.product.image31],
      colors: ['#837aff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
    {
      category: 'Jacket',
      title: 'Leather jacket for men',
      price: '$255.00',
      oldPrice: '$299.00',
      images: [IMAGES.product.image46, IMAGES.product.image45],
      colors: ['#837aff', '#f39fab'],
      size: ['S', 'M'],
    },
    {
      category: 'T-Shirt',
      title: 'Pink T-shirt for girl',
      price: '$75.00',
      oldPrice: '$86.00',
      images: [IMAGES.product.image58, IMAGES.product.image59],
      colors: ['#74c7ff', '#f39fab'],
      size: ['X', 'XL'],
    },
    {
      category: 'T-Shirt',
      title: 'Red T-shirt for women',
      price: '$26.00',
      oldPrice: '$35.00',
      flag: {
        type: 'trending',
        value: 'Trending',
      },
      images: [IMAGES.product.image42, IMAGES.product.image43],
      colors: ['#f39fab', '#837aff'],
      size: ['S', 'M'],
    },
    {
      category: 'T-Shirt',
      title: 'Blue T-shirt for men',
      price: '$76.00',
      oldPrice: '$82.00',
      images: [IMAGES.product.image51, IMAGES.product.image52],
      colors: ['#f39fab', '#74c7ff'],
      size: ['S', 'M'],
    },
    {
      category: 'T-Shirt',
      title: 'White T-shirt for boys',
      price: '$50.00',
      oldPrice: '$60.00',
      images: [IMAGES.product.image27, IMAGES.product.image26],
      colors: ['#74c7ff', '#837aff'],
      size: ['M', 'X', 'XL'],
    },
    {
      category: 'T-Shirt',
      title: 'Black T-Shirt for girl',
      price: '$71.00',
      oldPrice: '$98.00',
      flag: {
        type: 'new',
        value: 'New',
      },
      images: [IMAGES.product.image22, IMAGES.product.image23],
      colors: ['#000000', '#837aff'],
      size: ['S', 'M'],
    },
    {
      category: 'T-Shirt',
      title: 'Blue T-shirt for men',
      price: '$76.00',
      oldPrice: '$82.00',
      images: [IMAGES.product.image51, IMAGES.product.image52],
      colors: ['#f39fab', '#74c7ff'],
      size: ['S', 'M'],
    },
    {
      category: 'T-shirt',
      title: 'Blue T-Shirt for men',
      price: '$125.00',
      oldPrice: '$250.00',
      images: [IMAGES.product.image30, IMAGES.product.image31],
      colors: ['#837aff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
  ];

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
                  {all.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard {...item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="womens">
                <div className="row">
                  {all.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard {...item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="mens">
                <div className="row">
                  {all.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard {...item} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="kids">
                <div className="row">
                  {all.map((item, i) => (
                    <div className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                      <ProductCard {...item} key={i} />
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
