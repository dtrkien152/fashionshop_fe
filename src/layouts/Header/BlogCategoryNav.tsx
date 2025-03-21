import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoryModel } from "~/dto";
import postService from '~/services/post.service.ts';

export const BlogCategoryNav: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await postService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("❌ Lỗi API:", error);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: number) => {
    e.preventDefault();
    navigate(`/blogs?categoryId=${categoryId}&page=1`);
  };

  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="javascript:void(0)">
        Blog
      </a>
      <ul className="dropdown-menu">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>
              <a
                className="dropdown-item"
                href={`/blog?categoryId=${category.id}&page=1`}
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                {category.name}
              </a>
            </li>
          ))
        ) : (
          <li className="dropdown-item">Không có danh mục</li>
        )}
      </ul>
    </li>
  );
};
