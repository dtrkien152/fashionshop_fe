import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import postService from "~/services/post.service.ts";
import toast from "react-hot-toast";
import { IPostWithComments, PostCategory } from "~/dto/post.dto.ts";

export const BlogSidebar: React.FC = () => {
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [topPostLastest, setTopPostLastest] = useState<IPostWithComments[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lấy giá trị keyword & categoryId từ URL
  const keywordFromURL = searchParams.get("keyword") || "";
  const categoryIdFromURL = searchParams.get("categoryId");

  // State lưu từ khóa tìm kiếm
  const [keyword, setKeyword] = useState(keywordFromURL);

  useEffect(() => {
    fetchData();
  }, [searchParams]); // Theo dõi thay đổi URL

  const fetchData = () => {
    getCategoryInfo();
    getPostLastestInfo();
  };

  const getCategoryInfo = async () => {
    try {
      const response = await postService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("❌ Lỗi API:", error);
      toast.error("Lỗi khi tải danh mục");
    }
  };

  const getPostLastestInfo = async () => {
    try {
      const response = await postService.gettopPostLastest();
      setTopPostLastest(response.data);
    } catch (error) {
      console.error("❌ Lỗi API:", error);
      toast.error("Lỗi khi tải bài viết mới nhất");
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("keyword", keyword);
      newParams.set("page", "1"); // Reset về trang đầu tiên
      return newParams;
    });
  };;

  return (
    <div className="col-lg-3 col-12 md-30">
      <div className="cr-blog-sideview" data-aos="fade-up" data-aos-duration="2000">

        {/* 🔍 Ô Tìm kiếm */}
        <div className="cr-serch-box">
          <form className="cr-search" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <i className="ri-search-line"></i>
            </button>
          </form>
        </div>

        {/* 📂 Danh mục */}
        <div className="cr-blog-categories">
          <div className="blog-heading">
            <h4>Danh mục</h4>
          </div>
          <div className="cr-blog-categories-content">
            <ul>
              {categories.length > 0 ? (
                categories.map((category) => {
                  const isSelected = categoryIdFromURL === String(category.id); // Kiểm tra nếu danh mục đang được chọn
                  return (
                    <li key={category.id}>
                      <a
                        href={`?categoryId=${category.id}&page=1`} // Hỗ trợ SEO
                        onClick={(e) => {
                          e.preventDefault(); // Ngăn tải lại trang
                          setSearchParams((prev) => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set("categoryId", String(category.id));
                            newParams.set("page", "1"); // Reset trang
                            if (keyword) newParams.set("keyword", keyword); // Giữ từ khóa nếu có
                            return newParams;
                          });
                        }}
                        style={{ fontWeight: isSelected ? "bold" : "normal" }} // In đậm danh mục đã chọn
                      >
                        {isSelected ? <b>{category.name}</b> : category.name} <span>({category.postCount})</span>
                      </a>
                    </li>
                  );
                })
              ) : (
                <p>Không có danh mục nào.</p>
              )}
            </ul>
          </div>
        </div>

        {/* 📝 Bài viết mới nhất */}
        <div className="cr-blog-recent">
          <div className="blog-heading">
            <h4>Bài viết mới nhất</h4>
          </div>
          <div className="cr-blog-recent-posts">
            {topPostLastest.length > 0 ? (
              topPostLastest.map((post) => (
                <div
                  className="cr-blog-recent-post"
                  key={post.id}
                  onClick={() => navigate(`/blogs/${post.code}`)} // Chuyển trang không load lại
                  style={{ cursor: "pointer" }}
                >
                  <div className="cr-blog-recent-image">
                    <img src={post.thumbnailUrl || "default-image.jpg"} alt={post.title} />
                  </div>
                  <div className="cr-blog-recent-content">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <h4>{post.title}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có bài viết nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
