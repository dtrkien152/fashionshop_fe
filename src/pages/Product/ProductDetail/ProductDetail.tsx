import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import productService from '~/services/product.service.ts';
import ProductSection from '~/pages/Product/ProductDetail/components/ProductSection.tsx';
import RecommendProducts from '~/pages/Product/ProductDetail/components/RecommendProducts.tsx';
import {IProductDetailResponse, IProductSubDetailReviewDto} from '~/dto';
import {PageParams} from '~/dto/paging.dto.ts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetailResponse>();
  const [reviews, setReviews] = useState({
    totalItems: 0,
    totalPages: 0,
    data: [] as IProductSubDetailReviewDto[],
  });
  const [pagingParams, setPagingParams] = useState<PageParams>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchProductDetail();
    fetchProductReview();
    // Cuộn lên đầu trang khi id thay đổi
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchProductDetail = () => {
    if (!id) return;
    productService
      .getProductDetail(id)
      .then((res) => {
        const totalAvailable = res.data.productSubDetails.reduce((total:any, subDetail:any) => {
          return total + (subDetail.unitInStocks[0] || 0);
        }, 0);
        setProduct({...res.data,totalAvailable:totalAvailable});
      })
      .catch((err) => {
        console.error(err);
        setProduct(undefined);
      });
  };

  const fetchProductReview = () => {
    if (!id) return;
    productService
      .getReviewProduct(id, 1, 10)
      .then((res) => {
        setReviews({
          data: res.data.data,
          totalItems: res.data.totalItems,
          totalPages: res.data.totalPages,
        });
      })
      .catch((err) => {
        console.error(err);
        setProduct(undefined);
      });
  };

  const voteDesc = ['Tồi tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'];

  return (
    <>
      <ProductSection products={product} />
      {/*<section className="section-product padding-t-100">*/}
      {/*  <div className="container">*/}
      {/*    <div className="cr-blog-comments mt-4">*/}
      {/*      <h3>{reviews.totalItems} Đánh giá</h3>*/}

      {/*      {reviews.data.length > 0 ? (*/}
      {/*        reviews.data.map((review) => (*/}
      {/*          <div key={review.id} className="cr-blog-details-message">*/}
      {/*            <p>*/}
      {/*              {review.comment}*/}
      {/*              <Rate*/}
      {/*                style={{ float: 'right' }}*/}
      {/*                tooltips={voteDesc}*/}
      {/*                value={review.rating}*/}
      {/*                disabled={true}*/}
      {/*              />*/}
      {/*            </p>*/}
      {/*            <h5 className="title">*/}
      {/*              /!*<img src={comment.avatar || "/default-avatar.png"} alt="avatar" className="comment-avatar" />*!/*/}
      {/*              {review.customerName} -{' '}*/}
      {/*              {new Date(review.createdAt as Date).toLocaleDateString()}*/}
      {/*            </h5>*/}
      {/*          </div>*/}
      {/*        ))*/}
      {/*      ) : (*/}
      {/*        <p>Chưa có đánh giá nào.</p>*/}
      {/*      )}*/}

      {/*      /!* Phân trang bình luận *!/*/}
      {/*      {reviews.totalPages > 1 && (*/}
      {/*        <nav aria-label="Comment Pagination" className="cr-pagination">*/}
      {/*          <Pagination*/}
      {/*            current={pagingParams.page}*/}
      {/*            pageSize={pagingParams.limit}*/}
      {/*            total={reviews.totalItems}*/}
      {/*            onChange={(page) => setPagingParams((params) => ({ ...params, page }))}*/}
      {/*            style={{ marginTop: 20, textAlign: 'center' }}*/}
      {/*          />*/}
      {/*        </nav>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {id && <RecommendProducts productId={Number(id)} />}
    </>
  );
};

export default ProductDetail;
