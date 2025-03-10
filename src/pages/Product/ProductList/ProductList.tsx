import * as React from 'react';
import { IProductItemResponse, IProductSearchParam } from '~/shared/model/product.model.ts';
import { formatCurrencyVND } from '~/shared/utils/stringformat.ts';
import { useSearchParams } from 'react-router-dom';
import { SORT_BY_ENUM } from '~/shared/model/common.model.ts';
import { ProductListBreadcrumb } from '~/pages/Product/ProductList/components/ProductListBreadcrumb.tsx';
import { productService } from '~/services';

const DEFAULT_SEARCH_PARAMS: IProductSearchParam = {
  keyword: null,
  categoryId: null,
  sortBy: SORT_BY_ENUM.NEWEST,
  limit: 10,
  page: 0,
};

export const ProductList = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = React.useState<IProductItemResponse[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const buildSearchParams = (): IProductSearchParam => {
    return {
      keyword: searchParams.get('keyword') ?? DEFAULT_SEARCH_PARAMS.keyword,
      categoryId: searchParams.get('categoryId')
        ? Number(searchParams.get('categoryId'))
        : DEFAULT_SEARCH_PARAMS.categoryId,
      sortBy: (searchParams.get('sortBy') as SORT_BY_ENUM) ?? SORT_BY_ENUM.NEWEST,
      limit: Number(searchParams.get('limit')) || DEFAULT_SEARCH_PARAMS.limit,
      page: Number(searchParams.get('page')) || DEFAULT_SEARCH_PARAMS.page,
    };
  };

  const fetchProducts = async () => {
    const params = buildSearchParams();
    productService.searchProduct(params)
      .then((resp) => {
        const data: IProductItemResponse[] = resp.data.data;
        setProducts(
          data.map((item) => ({
            ...item,
            salePrice: formatCurrencyVND(Number(item.salePrice)),
            originalPrice: formatCurrencyVND(Number(item.originalPrice)),
          }))
        );
      })
      .catch((reason) => {
        console.log('error fetch product ', reason);
      });
  };
  return (
    <div>
      <div className="cr-sidebar-overlay"></div>
      <div id="cr_mobile_menu" className="cr-side-cart cr-mobile-menu">
        <div className="cr-menu-title">
          <span className="menu-title">My Menu</span>
          <button type="button" className="cr-close">
            ×
          </button>
        </div>
        <div className="cr-menu-inner">
          <div className="cr-menu-content">
            <ul>
              <li className="dropdown drop-list">
                <a href="index.html">Home</a>
              </li>
              <li className="dropdown drop-list">
                <span className="menu-toggle"></span>
                <a href="javascript:void(0)" className="dropdown-list">
                  Category
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="shop-left-sidebar.html">Shop Left sidebar</a>
                  </li>
                  <li>
                    <a href="shop-right-sidebar.html">Shop Right sidebar</a>
                  </li>
                  <li>
                    <a href="shop-full-width.html">Full Width</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown drop-list">
                <span className="menu-toggle"></span>
                <a href="javascript:void(0)" className="dropdown-list">
                  product
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="product-left-sidebar.html">product Left sidebar</a>
                  </li>
                  <li>
                    <a href="product-right-sidebar.html">product Right sidebar</a>
                  </li>
                  <li>
                    <a href="product-full-width.html">Product Full Width </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown drop-list">
                <span className="menu-toggle"></span>
                <a href="javascript:void(0)" className="dropdown-list">
                  Pages
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact Us</a>
                  </li>
                  <li>
                    <a href="cart.html">Cart</a>
                  </li>
                  <li>
                    <a href="checkout.html">Checkout</a>
                  </li>
                  <li>
                    <a href="track-order.html">Track Order</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="faq.html">Faq</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                  <li>
                    <a href="policy.html">Policy</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown drop-list">
                <span className="menu-toggle"></span>
                <a href="javascript:void(0)" className="dropdown-list">
                  Blog
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="blog-left-sidebar.html">Left Sidebar</a>
                  </li>
                  <li>
                    <a href="blog-right-sidebar.html">Right Sidebar</a>
                  </li>
                  <li>
                    <a href="blog-full-width.html">Full Width</a>
                  </li>
                  <li>
                    <a href="blog-detail-left-sidebar.html">Detail Left Sidebar</a>
                  </li>
                  <li>
                    <a href="blog-detail-right-sidebar.html">Detail Right Sidebar</a>
                  </li>
                  <li>
                    <a href="blog-detail-full-width.html">Detail Full Width</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown drop-list">
                <span className="menu-toggle"></span>
                <a href="javascript:void(0)">Element</a>
                <ul className="sub-menu">
                  <li>
                    <a href="elements-products.html">Products</a>
                  </li>
                  <li>
                    <a href="elements-typography.html">Typography</a>
                  </li>
                  <li>
                    <a href="elements-buttons.html">Buttons</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ProductListBreadcrumb/>

      <section className="section-shop padding-tb-100">
        <div className="container">
          <div className="row d-none">
            <div className="col-lg-12">
              <div
                className="mb-30"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="400"
              >
                <div className="cr-banner">
                  <h2>Categories</h2>
                </div>
                <div className="cr-banner-sub-title">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore lacus vel facilisis.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-12"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="600"
            >
              <div className="row">
                <div className="col-12">
                  <div className="cr-shop-bredekamp">
                    <div className="cr-toggle">
                      <a href="javascript:void(0)" className="shop_side_view">
                        <i className="ri-filter-line"></i>
                      </a>
                      <a href="javascript:void(0)" className="gridCol active-grid">
                        <i className="ri-grid-line"></i>
                      </a>
                      <a href="javascript:void(0)" className="gridRow">
                        <i className="ri-list-check-2"></i>
                      </a>
                    </div>
                    <div className="center-content">
                      <span>We found 29 items for you!</span>
                    </div>
                    <div className="cr-select">
                      <label>Sort By :</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Featured</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row col-50 mb-minus-24">
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/1.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Vegetables</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-line"></i>
                          <p>(4.5)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Fresh organic villa farm lomon 500gm pack
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$120.25</span>{' '}
                        <span className="old-price">$123.25</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/9.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Snacks</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Best snakes with hazel nut pack 200gm
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$145</span>{' '}
                        <span className="old-price">$150</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/2.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Fruits</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-line"></i>
                          <p>(4.5)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Fresh organic apple 1kg simla marming
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$120.25</span>{' '}
                        <span className="old-price">$123.25</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/3.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Fruits</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-line"></i>
                          <i className="ri-star-line"></i>
                          <p>(3.2)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Organic fresh venila farm watermelon 5kg
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$50.30</span>{' '}
                        <span className="old-price">$72.60</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/10.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Snacks</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Sweet crunchy nut mix 250gm pack
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$120.25</span>{' '}
                        <span className="old-price">$123.25</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/17.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Bakery</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Delicious white baked fresh bread and toast
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$20</span>{' '}
                        <span className="old-price">$22.10</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/13.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Bakery</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Delicious white baked fresh bread and toast
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$20</span>{' '}
                        <span className="old-price">$22.10</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/11.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Bakery</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Delicious white baked fresh bread and toast
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$20</span>{' '}
                        <span className="old-price">$22.10</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/12.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Bakery</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Delicious white baked fresh bread and toast
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$20</span>{' '}
                        <span className="old-price">$22.10</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/1.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Vegetables</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-line"></i>
                          <p>(4.5)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Fresh organic villa farm lomon 500gm pack
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$120.25</span>{' '}
                        <span className="old-price">$123.25</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/9.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Snacks</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <p>(5.0)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Best snakes with hazel nut pack 200gm
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$145</span>{' '}
                        <span className="old-price">$150</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 cr-product-box mb-24">
                  <div className="cr-product-card">
                    <div className="cr-product-image">
                      <div className="cr-image-inner zoom-image-hover">
                        <img src="assets/img/product/2.jpg" alt="product-1" />
                      </div>
                      <div className="cr-side-view">
                        <a href="javascript:void(0)" className="wishlist">
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
                      <a className="cr-shopping-bag" href="javascript:void(0)">
                        <i className="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div className="cr-product-details">
                      <div className="cr-brand">
                        <a href="shop-left-sidebar.html">Fruits</a>
                        <div className="cr-star">
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-fill"></i>
                          <i className="ri-star-line"></i>
                          <p>(4.5)</p>
                        </div>
                      </div>
                      <a href="product-left-sidebar.html" className="title">
                        Fresh organic apple 1kg simla marming
                      </a>
                      <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore lacus vel facilisis.
                      </p>
                      <p className="cr-price">
                        <span className="new-price">$120.25</span>{' '}
                        <span className="old-price">$123.25</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <nav aria-label="..." className="cr-pagination">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <span className="page-link">Previous</span>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
