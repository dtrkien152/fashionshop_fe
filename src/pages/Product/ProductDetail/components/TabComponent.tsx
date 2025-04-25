import {useEffect, useState} from 'react';
import {IProductDetailResponse, IProductSubDetailReviewDto} from "~/dto";
import {IMAGES} from "~/images";
import productService from "../../../../services/product.service.ts";
import {format} from 'date-fns';

interface Props {
    products?: IProductDetailResponse;
}

interface ReviewTabProps {
    reviews: {
        data: IProductSubDetailReviewDto[];
    };
}

const TabComponent = (props: Props) => {
    const [activeTab, setActiveTab] = useState('description');
    const [reviews, setReviews] = useState({
        totalItems: 0,
        totalPages: 0,
        data: [] as IProductSubDetailReviewDto[],
    });

    useEffect(() => {
        fetchProductReview();
        // Cuộn lên đầu trang khi id thay đổi
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [props.products]);
    const fetchProductReview = () => {
        if (!props.products?.productId) return;
        productService
            .getReviewProduct(props.products?.productId.toString(), 1, 10)
            .then((res) => {
                setReviews({
                    data: res.data.data,
                    totalItems: res.data.totalItems,
                    totalPages: res.data.totalPages,
                });
            })
            .catch((err) => {
                console.error(err);

            });
    };
    return (
        <div className="row" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
            <div className="col-12">
                <div className="cr-paking-delivery">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('description')}
                                    type="button" role="tab">
                                Mô tả sản phẩm
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('information')}
                                    type="button" role="tab">
                                Thông tin sản phẩm
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('review')}
                                    type="button" role="tab">
                                Review ({reviews.data.length})
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {activeTab === 'description' && <DescriptionTab products={props.products}/>}
                        {activeTab === 'information' && <InformationTab products={props.products}/>}
                        {activeTab === 'review' && <ReviewTab reviews={reviews}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
const convertGender = (gender: any) => {
    try {
        if (gender === 'male') {
            return 'Nam'
        } else if (gender === 'female') {
            return 'Nữ'
        } else {
            return 'Unisex'
        }

    } catch (e) {
        console.log(e)
        return 'Unisex'
    }
}
const convertDate = (date: any) => {
    try {

        return format(new Date(date), 'dd/MM/yyyy')

    } catch (e) {
        console.log(e)
        return ''
    }
}
const convertTextToHtml = (rawText: any) => {
    if (!rawText) return '';

    const content = rawText
        .split('\r\n') // Tách từng dòng
        .filter(line => line.trim() !== '') // Bỏ dòng trống
        .map(line => {
            try {
                const [key, value] = line.split('\t');
                return `<strong>${key.trim()}:</strong> ${value.trim()}`;

            } catch (e) {
                return '';
            }
        })
        .join('<br />');

    return `<br />${content}`; // Thêm dòng trắng trước nội dung
};
export default TabComponent;

// DescriptionTab.js
export const DescriptionTab = (props: Props) => (
    <div className="cr-tab-content">
        <div className="cr-description">
            <p>{props.products?.description}</p>
        </div>
        <h4 className="heading">Chính sách đóng gói và giao hàng</h4>
        <div className="cr-description">
            <p>
                Chúng tôi cam kết đóng gói sản phẩm cẩn thận, chắc chắn và thẩm mỹ, đảm bảo hàng hóa luôn ở trong tình
                trạng tốt nhất khi đến tay bạn.
                Mỗi đơn hàng đều được xử lý và giao nhanh chóng trong vòng 24–48 giờ làm việc.
                Đối với các khu vực nội thành, bạn có thể nhận hàng chỉ sau 1–2 ngày.
                Với các đơn hàng ngoại thành hoặc tỉnh xa, thời gian giao hàng dao động từ 3–5 ngày tùy địa chỉ.
                <br/><br/>
                Đặc biệt, chúng tôi hỗ trợ kiểm tra hàng trước khi thanh toán, mang lại sự an tâm tuyệt đối cho khách
                hàng.
                Đóng gói an toàn – Giao hàng nhanh chóng – Phục vụ tận tâm là cam kết của chúng tôi!
            </p>
        </div>

    </div>
);

// InformationTab.js
export const InformationTab = (props: Props) => (
    <div className="cr-tab-content">

        <div className="list">
            <ul>
                <li><label>Tên sản phẩm <span>:</span></label>{props.products?.productName}</li>
                <li><label>Thương hiệu <span>:</span></label>{props.products?.brand}</li>
                <li><label>Danh mục <span>:</span></label>{props.products?.categoryName}</li>
                <li><label>Giới tính <span>:</span></label> {convertGender(props.products?.gender)}</li>
                <li><label>Thông tin khác <span>:</span></label>
                    <div
                        className="product-other-info"
                        dangerouslySetInnerHTML={{
                            __html: convertTextToHtml(props.products?.other_info || ''),
                        }}
                    />
                </li>
                <li><label>Số lượng có sẵn <span>:</span></label> {props.products?.totalAvailable}</li>
            </ul>
        </div>
    </div>
);

// // ReviewTab.js
export const ReviewTab = ({reviews}: ReviewTabProps) => {
    return (
        <>
            <div className={"cr-tab-content-from"}>
                <h5>
                    {reviews.data.length} Đánh giá
                </h5>
            </div>
            <div className="cr-tab-content-from">
                {!reviews || !reviews.data || reviews.data.length === 0 ? (
                    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                    reviews.data.map((review) => (
                        <div className="post" key={review.id}>
                            <div className="content">
                                <img
                                    src={IMAGES.user.defaultAvatar}
                                    alt="avatar"
                                    style={{width: 50, height: 50, borderRadius: '50%'}}
                                />
                                <div className="details">
                <span className="date">
                    {convertDate(review.createdAt)}
                </span>
                                    <span className="name">{review.customerName}</span>
                                </div>
                                <div className="cr-t-review-rating">
                                    {[...Array(5)].map((_, idx) => (
                                        <i
                                            key={idx}
                                            className={
                                                idx < Number(review.rating)
                                                    ? 'ri-star-s-fill'
                                                    : 'ri-star-s-line'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};