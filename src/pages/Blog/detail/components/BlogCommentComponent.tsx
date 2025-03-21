import React, { useState } from "react";
import { ICommentDetail } from "~/dto/post.dto.ts";
import { Pagination, Input, Button } from "antd";
import { useSelector } from "react-redux";
import postService from "~/services/post.service.ts";
import toast from "react-hot-toast";
import { RootState } from '~/redux';

interface BlogCommentProps {
  postId: number;
  comments: ICommentDetail[];
  pageSize: number;
  setComments: React.Dispatch<React.SetStateAction<ICommentDetail[]>>;
}

export const BlogCommentComponent: React.FC<BlogCommentProps> = ({ postId, comments, pageSize, setComments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy thông tin người dùng từ Redux
  const user = useSelector((state: RootState) => state.auth);

  // Kiểm tra nếu người dùng chưa đăng nhập
  const isLoggedIn = user.isLoggedIn;

  // Lấy danh sách bình luận theo trang
  const totalItems = comments.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedComments = comments.slice(startIndex, endIndex);

  // Gửi bình luận mới
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Bình luận không được để trống!");
      return;
    }

    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      return;
    }

    setLoading(true);
    try {
      // Gửi bình luận với thông tin người dùng
      const response = await postService.addComment({
        postId,
        content: newComment
      });

      const newCommentData: ICommentDetail = response.data;

      // Cập nhật danh sách bình luận
      setComments((prev) => [newCommentData, ...prev]);

      // Reset ô nhập bình luận
      setNewComment("");

      toast.success("Bình luận đã được thêm!");
    } catch (error) {
      console.error("❌ Lỗi khi thêm bình luận:", error);
      toast.error("Không thể thêm bình luận.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cr-blog-comments mt-4">
      <h3>{totalItems} Bình luận</h3>

      {/* Form thêm bình luận */}
      {isLoggedIn ? (
        <div className="cr-add-comment">
          <Input.TextArea
            rows={3}
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="primary" onClick={handleAddComment} loading={loading} style={{ marginTop: 10 }}>
            Gửi bình luận
          </Button>
        </div>
      ) : (
        <p>Vui lòng <a href="/login">đăng nhập</a> để bình luận.</p>
      )}

      {/* Danh sách bình luận */}
      {paginatedComments.length > 0 ? (
        paginatedComments.map((comment) => (
          <div key={comment.id} className="cr-blog-details-message">
            <p>{comment.content}</p>
            <h5 className="title">
              {/*<img src={comment.avatar || "/default-avatar.png"} alt="avatar" className="comment-avatar" />*/}
              {comment.fullName} - {new Date(comment.createdAt).toLocaleDateString()}
            </h5>
          </div>
        ))
      ) : (
        <p>Chưa có bình luận nào.</p>
      )}

      {/* Phân trang bình luận */}
      {totalItems > pageSize && (
        <nav aria-label="Comment Pagination" className="cr-pagination">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        </nav>
      )}
    </div>
  );
};
