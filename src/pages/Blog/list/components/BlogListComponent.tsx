import React from "react";
import { Pagination } from "antd";
import { BlogListProps } from "~/dto/post.dto.ts";
import { Link } from "react-router-dom";

export const BlogListComponent: React.FC<BlogListProps> = ({
                                                             posts, totalItems, pageSize, currentPage, onPageChange
                                                           }) => {

  // Hàm trích xuất nội dung text từ HTML (giới hạn ký tự)
  const extractTextFromHTML = (html: string, maxLength: number = 250): string => {
    const div = document.createElement("div");
    div.innerHTML = html; // Chuyển nội dung HTML thành thẻ DOM
    const text = div.textContent || div.innerText || ""; // Lấy nội dung dạng text

    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="col-lg-9 col-12 md-30">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="cr-blog-classic" key={post.id} data-aos="fade-up" data-aos-duration="2000">
            <div className="cr-blog-classic-content">
              <div className="cr-comment">
                <span>By {post.author} <code> / {new Date(post.createdAt).toLocaleDateString()}</code></span>
              </div>
              <h4>{post.title}</h4>

              <p>{extractTextFromHTML(post.content, 180)}</p>

              {/* 🔥 Sửa đường dẫn thành `/blogs/:code` */}
              <Link to={`/blogs/${post.code}`}>Read more</Link>
            </div>

            {post.thumbnailUrl && (
              <div className="cr-blog-image">
                <img src={post.thumbnailUrl} alt={post.title} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Không có bài viết nào.</p>
      )}

      {/* Pagination với Ant Design */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};
