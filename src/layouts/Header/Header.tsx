const Header = () => {
  return (
    <header className="header-section section sticker">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-auto">
            <div className="header-logo">
              <a href="index.html">
                <img src="img/logo.png" alt="main logo" />
              </a>
            </div>
          </div>
          <div className="col-auto d-flex">
            <nav className="main-menu">
              <ul>
                <li>
                  <a href="index.html">Home</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="index.html">Home one</a>
                    </li>
                    <li>
                      <a href="index-2.html">Home two</a>
                    </li>
                    <li>
                      <a href="index-3.html">Home three</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="shop.html">shop</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="shop.html">shop</a>
                    </li>
                    <li>
                      <a href="product-details.html">product details</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="cart.html">cart</a>
                    </li>
                    <li>
                      <a href="checkout.html">checkout</a>
                    </li>
                    <li>
                      <a href="login.html">login</a>
                    </li>
                    <li>
                      <a href="register.html">register</a>
                    </li>
                    <li>
                      <a href="wishlist.html">wishlist</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="blog.html">Blog</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="blog.html">blog</a>
                    </li>
                    <li>
                      <a href="blog-details.html">blog details</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </nav>
            <div className="header-option-btns d-flex">
              <div className="header-search">
                <button className="search-toggle">
                  <i className="pe-7s-search"></i>
                </button>
                <div className="header-search-form">
                  <form action="#">
                    <input type="text" placeholder="Search" />
                    <button>
                      <i className="fa fa-long-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="header-account">
                <ul>
                  <li>
                    <a href="#" className="account-toggle">
                      <i className="pe-7s-config"></i>
                    </a>
                    <ul className="account-menu">
                      <li>
                        <a href="login.html">Log in</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="wishlist.html">Wish list</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="header-cart">
                <a className="cart-toggle" href="#">
                  <i className="pe-7s-cart"></i>
                  <span>2</span>
                </a>
                <div className="mini-cart-brief text-left">
                  <div className="all-cart-product clearfix">
                    <div className="single-cart clearfix">
                      <div className="cart-image">
                        <a href="product-details.html">
                          <img src="img/product/cart-1.jpg" alt="" />
                        </a>
                      </div>
                      <div className="cart-info">
                        <h5>
                          <a href="product-details.html">Le Parc Minotti Chair</a>
                        </h5>
                        <p>1 x £9.00</p>
                        <a href="#" className="cart-delete" title="Remove this item">
                          <i className="pe-7s-trash"></i>
                        </a>
                      </div>
                    </div>
                    <div className="single-cart clearfix">
                      <div className="cart-image">
                        <a href="product-details.html">
                          <img src="img/product/cart-2.jpg" alt="" />
                        </a>
                      </div>
                      <div className="cart-info">
                        <h5>
                          <a href="product-details.html">DSR Eiffel chair</a>
                        </h5>
                        <p>1 x £9.00</p>
                        <a href="#" className="cart-delete" title="Remove this item">
                          <i className="pe-7s-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="cart-totals">
                    <h5>
                      Total <span>£12.00</span>
                    </h5>
                  </div>
                  <div className="cart-bottom  clearfix">
                    <a href="checkout.html">Check out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobile-menu"></div>
        </div>
      </div>
    </header>
  );
};
export default Header;
