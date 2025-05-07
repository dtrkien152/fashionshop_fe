import { IMAGES } from '~/images';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import { ICategoryModel } from '../../dto';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { logout } from '~/redux';
import { categoryService } from '~/services';
import ProfileModal from '~/pages/AuthPage/ProfilePage/ProfileModal.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { SearchForm } from '~/layouts/Header/components/SearchForm.tsx';
import { ROUTER_PATH } from '~/routes';
import { BlogCategoryNav } from '~/layouts/Header/BlogCategoryNav.tsx';

interface Props {
  onOpenCart: () => void;
}

const Header: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const menuRef = useRef<any>(null);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const [prevDirection, setPrevDirection] = useState(0);
  const [categories, setCategories] = React.useState<ICategoryModel[]>([]);
  const { email, avatar, fullName, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleOpenModal = (tabKey: string) => {
    setActiveTab(tabKey);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

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
  useEffect(() => {
    const checkScroll = () => {
      const curScroll = window.scrollY;
      let direction = curScroll > prevScroll ? 2 : curScroll < prevScroll ? 1 : 0;

      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }

      setPrevScroll(curScroll);
    };

    const toggleHeader = (direction: number, curScroll: number) => {
      if (menuRef.current) {
        if (direction === 2 && curScroll > -133) {
          setPrevDirection(direction);
          menuRef.current.classList.add('menu_fixed_up');
        } else if (direction === 1) {
          setPrevDirection(direction);
          menuRef.current.classList.add('menu_fixed');
          menuRef.current.classList.remove('menu_fixed_up');
        }
      }
    };

    const handleScroll = () => {
      const nextElement = $('.next') as any;
      if (!nextElement) return;
      const distance = nextElement.offset().top;
      if (window.scrollY <= distance + 9) {
        menuRef.current?.classList.remove('menu_fixed');
      } else {
        checkScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll, prevDirection]);

  const navigate = useNavigate();

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: number) => {
    e.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
    const searchParams = new URLSearchParams();
    searchParams.set('categoryId', categoryId.toString());
    searchParams.set('page', '0'); // Reset về trang đầu tiên
    navigate(`/product?${searchParams.toString()}`);
  };

  return (
    <header className="cr-fix" id="cr-main-menu-desk" ref={menuRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="top-header">
              <Link to="/" className="cr-logo">
                <img src={IMAGES.logo} alt="logo" className="logo" />
              </Link>
              {/*<form className="cr-search">*/}
              {/*  <input className="search-input" type="text" placeholder="Tìm kiếm sản phẩm..." />*/}
              {/*  <select className="form-select" aria-label="Default select example">*/}
              {/*    <option selected>Tất cả danh muc</option>*/}
              {/*    {categories.map((category: ICategoryModel, index: number) => (*/}
              {/*      <option key={index} value={category.id}>{category.name}</option>*/}
              {/*    ))}*/}
              {/*  </select>*/}
              {/*  <a href="javascript:void(0)" className="search-btn">*/}
              {/*    <i className="ri-search-line"></i>*/}
              {/*  </a>*/}
              {/*</form>*/}
              <SearchForm categories={categories} />
              {/*header */}
              <div className="cr-right-bar">
                {isLoggedIn && (
                  <Link to={ROUTER_PATH.orderList.extract} className="cr-right-bar-item">
                    <i className="ri-shopping-bag-2-line"></i>
                    <span>Đơn mua</span>
                  </Link>
                )}
                <a className="cr-right-bar-item Shopping-toggle" onClick={props.onOpenCart}>
                  <i className="ri-shopping-cart-line"></i>
                  <span>Giỏ hàng</span>
                </a>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle cr-right-bar-item"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={fullName || 'Avatar'}
                          className="rounded-circle"
                          style={{ width: '30px', height: '30px', marginRight: '8px' }}
                        />
                      ) : (
                        <i className="ri-user-3-line"></i>
                      )}
                      <span>{fullName || 'Tài khoản'}</span>
                    </a>
                    <ul className="dropdown-menu">
                      {email ? (
                        <>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => handleOpenModal('1')}
                              style={{ cursor: 'pointer' }}
                            >
                              Thông tin cá nhân
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={handleLogout}
                              style={{ cursor: 'pointer' }}
                            >
                              Đăng xuất
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link className="dropdown-item" to={ROUTER_PATH.login.extract}>
                              Đăng nhập
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={ROUTER_PATH.register.extract}>
                              Đăng Ký
                            </Link>
                          </li>
                        </>
                      )}
                      <ProfileModal
                        visible={isModalVisible}
                        onClose={handleCloseModal}
                        defaultActiveKey={activeTab}
                      />
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="cr-menu-list">
            <div className="cr-category-icon-block">
              {/*<div className="cr-category-menu">*/}
              {/*  <div className="cr-category-toggle">*/}
              {/*    <i className="ri-menu-2-line"></i>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className="cr-cat-dropdown">*/}
              {/*  <div className="cr-cat-block">*/}
              {/*    <div className="cr-cat-tab">*/}
              {/*      <div*/}
              {/*        className="cr-tab-list nav flex-column nav-pills"*/}
              {/*        id="v-pills-tab"*/}
              {/*        role="tablist"*/}
              {/*        aria-orientation="vertical"*/}
              {/*      >*/}
              {/*        <button*/}
              {/*          className="nav-link active"*/}
              {/*          id="v-pills-home-tab"*/}
              {/*          data-bs-toggle="pill"*/}
              {/*          data-bs-target="#v-pills-home"*/}
              {/*          type="button"*/}
              {/*          role="tab"*/}
              {/*          aria-controls="v-pills-home"*/}
              {/*          aria-selected="true"*/}
              {/*        >*/}
              {/*          Dairy &amp; Bakery*/}
              {/*        </button>*/}
              {/*        <button*/}
              {/*          className="nav-link"*/}
              {/*          id="v-pills-profile-tab"*/}
              {/*          data-bs-toggle="pill"*/}
              {/*          data-bs-target="#v-pills-profile"*/}
              {/*          type="button"*/}
              {/*          role="tab"*/}
              {/*          aria-controls="v-pills-profile"*/}
              {/*          aria-selected="false"*/}
              {/*          tabIndex={-1}*/}
              {/*        >*/}
              {/*          Fruits &amp; Vegetable*/}
              {/*        </button>*/}
              {/*        <button*/}
              {/*          className="nav-link"*/}
              {/*          id="v-pills-messages-tab"*/}
              {/*          data-bs-toggle="pill"*/}
              {/*          data-bs-target="#v-pills-messages"*/}
              {/*          type="button"*/}
              {/*          role="tab"*/}
              {/*          aria-controls="v-pills-messages"*/}
              {/*          aria-selected="false"*/}
              {/*          tabIndex={-1}*/}
              {/*        >*/}
              {/*          Snack &amp; Spice*/}
              {/*        </button>*/}
              {/*        <button*/}
              {/*          className="nav-link"*/}
              {/*          id="v-pills-settings-tab"*/}
              {/*          data-bs-toggle="pill"*/}
              {/*          data-bs-target="#v-pills-settings"*/}
              {/*          type="button"*/}
              {/*          role="tab"*/}
              {/*          aria-controls="v-pills-settings"*/}
              {/*          aria-selected="false"*/}
              {/*          tabIndex={-1}*/}
              {/*        >*/}
              {/*          Juice &amp; Drinks*/}
              {/*        </button>*/}
              {/*        <a className="nav-link" href="shop-left-sidebar.html">*/}
              {/*          View All{' '}*/}
              {/*        </a>*/}
              {/*      </div>*/}
              {/*      <div className="tab-content" id="v-pills-tabContent">*/}
              {/*        <div*/}
              {/*          className="tab-pane fade show active"*/}
              {/*          id="v-pills-home"*/}
              {/*          role="tabpanel"*/}
              {/*          aria-labelledby="v-pills-home-tab"*/}
              {/*        >*/}
              {/*          <div className="tab-list row">*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Dairy</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Milk</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Ice cream</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cheese</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Frozen custard</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Frozen yogurt</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Bakery</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cake and Pastry</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Rusk Toast</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Bread &amp; Buns</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Chocolate Brownie</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cream Roll</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*        <div*/}
              {/*          className="tab-pane fade"*/}
              {/*          id="v-pills-profile"*/}
              {/*          role="tabpanel"*/}
              {/*          aria-labelledby="v-pills-profile-tab"*/}
              {/*        >*/}
              {/*          <div className="tab-list row">*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Fruits</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cauliflower</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Bell Peppers</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Broccoli</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cabbage</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Tomato</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Vegetable</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cauliflower</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Bell Peppers</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Broccoli</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cabbage</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Tomato</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*        <div*/}
              {/*          className="tab-pane fade"*/}
              {/*          id="v-pills-messages"*/}
              {/*          role="tabpanel"*/}
              {/*          aria-labelledby="v-pills-messages-tab"*/}
              {/*        >*/}
              {/*          <div className="tab-list row">*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Snacks</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">French fries</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">potato chips</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Biscuits &amp; Cookies</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Popcorn</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Rice Cakes</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Spice</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cinnamon Powder</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Cumin Powder</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Fenugreek Powder</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Pepper Powder</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Long Pepper</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*        <div*/}
              {/*          className="tab-pane fade"*/}
              {/*          id="v-pills-settings"*/}
              {/*          role="tabpanel"*/}
              {/*          aria-labelledby="v-pills-settings-tab"*/}
              {/*        >*/}
              {/*          <div className="tab-list row">*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">Juice</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Mango Juice</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Coconut Water</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Tetra Pack</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Apple Juices</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Lychee Juice</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*            <div className="col">*/}
              {/*              <h6 className="cr-col-title">soft drink</h6>*/}
              {/*              <ul className="cat-list">*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Breizh Cola</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Green Cola</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Jolt Cola</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Mecca Cola</a>*/}
              {/*                </li>*/}
              {/*                <li>*/}
              {/*                  <a href="shop-left-sidebar.html">Topsia Cola</a>*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <nav className="navbar navbar-expand-lg">
              <a href="javascript:void(0)" className="navbar-toggler shadow-none">
                <i className="ri-menu-3-line"></i>
              </a>
              <div className="cr-header-buttons">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link" href="javascript:void(0)">
                      <i className="ri-user-3-line"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="register.html">
                          Register
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="checkout.html">
                          Checkout
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="login.html">
                          Login
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <a href="wishlist.html" className="cr-right-bar-item">
                  <i className="ri-heart-line"></i>
                </a>
                <a href="javascript:void(0)" className="cr-right-bar-item Shopping-toggle">
                  <i className="ri-shopping-cart-line"></i>
                </a>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Trang chủ
                    </Link>
                  </li>
                  {categories.map((category: ICategoryModel, index) => (
                    <li className="nav-item">
                      <a className="nav-link"
                         href={`/products?categoryId=${category.id}&page=0`}
                         onClick={(e) => handleCategoryClick(e, category.id)}>
                        {category.name}
                      </a>
                    </li>
                  ))}

                  {/*<li className="nav-item dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="javascript:void(0)">*/}
                  {/*    Thể loại*/}
                  {/*  </a>*/}
                  {/*  <ul className="dropdown-menu">*/}
                  {/*    {categories.map((category: ICategoryModel, index) => (*/}
                  {/*      <li key={index}>*/}
                  {/*        <a*/}
                  {/*          className="dropdown-item"*/}
                  {/*          href={`/products?categoryId=${category.id}&page=0`}*/}
                  {/*          onClick={(e) => handleCategoryClick(e, category.id)}*/}
                  {/*        >*/}
                  {/*          {category.name}*/}
                  {/*        </a>*/}
                  {/*      </li>*/}
                  {/*    ))}*/}
                  {/*  </ul>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="javascript:void(0)">*/}
                  {/*    Sản Phẩm*/}
                  {/*  </a>*/}
                  {/*  <ul className="dropdown-menu">*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="product-left-sidebar.html">*/}
                  {/*        Sản phẩm mới nhất*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="product-right-sidebar.html">*/}
                  {/*        sản phẩm bán chạy nhất*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="product-full-width.html">*/}
                  {/*        Product Full Width*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="javascript:void(0)">*/}
                  {/*    Pages*/}
                  {/*  </a>*/}
                  {/*  <ul className="dropdown-menu">*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="about.html">*/}
                  {/*        About Us*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="contact-us.html">*/}
                  {/*        Contact Us*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="cart.html">*/}
                  {/*        Cart*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="checkout.html">*/}
                  {/*        Checkout*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="track-order.html">*/}
                  {/*        Track Order*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="wishlist.html">*/}
                  {/*        Wishlist*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="faq.html">*/}
                  {/*        Faq*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="login.html">*/}
                  {/*        Login*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="register.html">*/}
                  {/*        Register*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="policy.html">*/}
                  {/*        Policy*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</li>*/}
                  {/*blog*/}
                  <BlogCategoryNav />
                  {/*<li className="nav-item dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="javascript:void(0)">*/}
                  {/*    Elements*/}
                  {/*  </a>*/}
                  {/*  <ul className="dropdown-menu">*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="elements-products.html">*/}
                  {/*        Products*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="elements-typography.html">*/}
                  {/*        Typography*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      <a className="dropdown-item" href="elements-buttons.html">*/}
                  {/*        Buttons*/}
                  {/*      </a>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</li>*/}
                </ul>
              </div>
            </nav>
            <div className="cr-location-block">
              {/*<div className="cr-location-menu">*/}
              {/*  <div className="cr-location-toggle">*/}
              {/*    <i className="ri-map-pin-line"></i>*/}
              {/*    <span className="cr-location-title d-1199 cr-location">{siteSelected?.name}</span>*/}
              {/*    <i className="ri-arrow-down-s-line d-1199 cr-angle"></i>*/}
              {/*  </div>*/}
              {/*  <div className="cr-location-content">*/}
              {/*    <div className="cr-location-dropdown">*/}
              {/*      <div className="row cr-location-wrapper">*/}
              {/*        <ul className="loc-grid">*/}
              {/*          {sites.map((site: ISite, index: number) => (*/}
              {/*            <li*/}
              {/*              className="loc-list"*/}
              {/*              key={index}*/}
              {/*              onClick={() => dispatch(setSiteSelected(site))}*/}
              {/*            >*/}
              {/*              <i className="ri-map-pin-line"></i>*/}
              {/*              <span className="cr-detail">{site.name}</span>*/}
              {/*            </li>*/}
              {/*          ))}*/}
              {/*        </ul>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
