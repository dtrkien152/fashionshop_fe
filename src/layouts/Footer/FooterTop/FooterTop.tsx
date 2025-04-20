import { IMAGES } from '~/images';
import { categoryService } from '~/services';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ICategoryModel } from '~/dto';
import { useNavigate } from 'react-router-dom';

const FooterTop = () => {
  const [categories, setCategories] = useState<ICategoryModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: number) => {
    e.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
    const searchParams = new URLSearchParams();
    searchParams.set('categoryId', categoryId.toString());
    searchParams.set('page', '0'); // Reset về trang đầu tiên
    navigate(`/product?${searchParams.toString()}`);
  };

  return (
      <div className="row footer-top padding-b-100">
        <div className="col-xl-4 col-lg-6 col-sm-12 col-12 cr-footer-border">
          <div className="cr-footer-logo">
            <div className="image">
              <img src={IMAGES.logo} alt="logo" className="logo"/>
            </div>
            <p>
              Vebo là một trong những shop thời trang uy ti trên thị trường. Hãy mua sắm những nhu cầu hàng ngày của bạn từ cửa
              hàng của chúng tôi.
            </p>
          </div>
          <div className="cr-footer">
            <h4 className="cr-sub-title cr-title-hidden">
              Liên hệ với chúng tôi
              <span className="cr-heading-res"></span>
            </h4>
            <ul className="cr-footer-links cr-footer-dropdown">
              <li className="location-icon">

              </li>
              <li className="mail-icon">
                <a href="javascript:void(0)">veboshop@gmail.com</a>
              </li>
              <li className="phone-icon">
                <a href="javascript:void(0)"> +0 123 4567890</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-6 col-sm-12 col-12 cr-footer-border">
          <div className="cr-footer">
            <h4 className="cr-sub-title">
              Công ty
              <span className="cr-heading-res"></span>
            </h4>
            <ul className="cr-footer-links cr-footer-dropdown">
              <li>
                <a href="about.html">Về chúng tôi</a>
              </li>
              <li>
                <a href="track-order.html">Thông tin giao hàng</a>
              </li>
              <li>
                <a href="policy.html">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="terms.html">Điều khoản & Điều kiện</a>
              </li>
              <li>
                <a href="contact-us.html">Liên hệ với chúng tôi</a>
              </li>
              <li>
                <a href="faq.html">Trung tâm hỗ trợ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-6 col-sm-12 col-12 cr-footer-border footer-list">
          <div className="cr-footer">
            <h4 className="cr-sub-title">
              Danh mục
              <span className="cr-heading-res"></span>
            </h4>
            <ul className="cr-footer-links cr-footer-dropdown">
              {categories.map((category: ICategoryModel, index) => (
                  <li key={index}>
                    <a
                        href={`/products?categoryId=${category.id}&page=0`}
                        onClick={(e) => handleCategoryClick(e, category.id)}
                    >
                      {category.name}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-sm-12 col-12 cr-footer-border">
          <div className="cr-footer cr-newsletter">
            <h4 className="cr-sub-title">
              Bản tin
              <span className="cr-heading-res"></span>
            </h4>
            <div className="cr-footer-links cr-footer-dropdown">
              <p className="news">Đăng ký để cập nhật tin tức từ chúng tôi.</p>
              <form className="cr-search-footer">
                <input className="search-input" type="text" placeholder="Tìm kiếm ở đây..."/>
                <a href="javascript:void(0)" className="search-btn">
                  <i className="ri-send-plane-fill"></i>
                </a>
              </form>
            </div>
            <div className="cr-social-media">
        <span>
          <a href="javascript:void(0)">
            <i className="ri-facebook-line"></i>
          </a>
        </span>
              <span>
          <a href="javascript:void(0)">
            <i className="ri-twitter-x-line"></i>
          </a>
        </span>
              <span>
          <a href="javascript:void(0)">
            <i className="ri-dribbble-line"></i>
          </a>
        </span>
              <span>
          <a href="javascript:void(0)">
            <i className="ri-instagram-line"></i>
          </a>
        </span>
            </div>
            <div className="cr-apps">
              <a href="#" className="app-img">
                <img src={IMAGES.app.android} className="adroid" alt="android" />
              </a>
              <a href="#" className="app-img">
                <img src={IMAGES.app.apple} className="apple" alt="apple" />
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};
export default FooterTop;
