import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import postService from "~/services/post.service.ts";
import toast from "react-hot-toast";
import {  IPostDetail } from '~/dto/post.dto.ts';
import { BreadcrumbComponent } from '~/pages/Blog/list/components/BreadcrumbComponent.tsx';
import { BlogSidebar } from '~/pages/Blog/list/components/BlogSidebar.tsx';
import { BlogDetailComponent } from '~/pages/Blog/detail/components/BlogDetailComponent.tsx';


const BlogDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // 🔥 Nhận `code` từ URL
  const [blog, setBlog] = useState<IPostDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (code) {
      fetchBlogDetail(code);
    }
  }, [code]);

  const fetchBlogDetail = async (code: string) => {
    setLoading(true);
    try {
      const response = await postService.getPostDetail(code); // 🔥 Gọi API với `code`
      setBlog(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải bài viết:", error);
      toast.error("Không thể tải bài viết.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;
  if (!blog) return <p>Không tìm thấy bài viết.</p>;

  return (
    <>
      <BreadcrumbComponent title="Tin tức" currentPage="Blog Classic" homePath="/" />
      <section className="section-blog-classic padding-tb-100">
        <div className="container">
          <div className="row">
            <BlogSidebar />
            <BlogDetailComponent blog={blog} />

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
