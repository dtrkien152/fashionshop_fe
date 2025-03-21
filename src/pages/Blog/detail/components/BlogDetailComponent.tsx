import React, { useEffect, useState } from 'react';
import { ICommentDetail, IPostDetail } from '~/dto/post.dto.ts';
import { BlogCommentComponent } from '~/pages/Blog/detail/components/BlogCommentComponent.tsx';

interface BlogDetailProps {
  blog: IPostDetail;
}

export const BlogDetailComponent: React.FC<BlogDetailProps> = ({ blog }) => {
  const [comments, setComments] = useState<ICommentDetail[]>(blog.comments || []);
  useEffect(() => {
    setComments(blog.comments || []);
  }, [blog]);
  return (
    <div
      className="col-lg-9 col-12 md-30"
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-delay="400"
    >
      <div className="cr-blog-details">
        {/* Ảnh bài viết */}
        {blog.thumbnailUrl && (
          <div className="cr-blog-details-image">
            <img src={blog.thumbnailUrl} alt={blog.title} />
          </div>
        )}

        {/* Nội dung bài viết */}
        <div className="cr-blog-details-content">
          <div className="cr-admin-date">
            <span>
              <code>By {blog.author}</code> / {blog.comments.length} Comment / Date -{' '}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="cr-banner">
            <h2>{blog.title}</h2>
          </div>
          {/* Nội dung bài viết */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>

        {/* Ảnh phụ trong bài viết */}
        <div className="row mt-30">
          {blog.thumbnailUrl && (
            <>
              <div className="col-6">
                <div className="cr-blog-inner-cols">
                  <div className="blog-img">
                    <img src={blog.thumbnailUrl} alt="related-1" />
                  </div>
                  <div className="cr-blog-inner-content">
                    <p>Một số thông tin liên quan đến bài viết.</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="cr-blog-inner-cols">
                  <div className="blog-img">
                    <img src={blog.thumbnailUrl} alt="related-2" />
                  </div>
                  <div className="cr-blog-inner-content">
                    <p>Thông tin mở rộng hoặc gợi ý.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/*comment */}
        <BlogCommentComponent postId={blog.id} comments={comments} pageSize={4} setComments={setComments} />


      </div>
    </div>
  );
};
