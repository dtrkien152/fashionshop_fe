import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';
import { CurrencyUtils } from '~/utils';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { CartProduct, OrderDto } from '~/dto';
import { OrderProductReviewAdd, OrderProductReviewEdit } from '~/components';
import { ORDER_STATUS } from '~/constants';
import { IProductSubDetailReview } from '~/models';
import { Popover, Rate } from 'antd';

interface Props {
  order?: OrderDto;
  onAddProductReview: (payload: any) => Promise<void>;
  onEditProductReview: (payload: any) => Promise<void>;
}

const OrderProductSection: React.FC<Props> = (props) => {
  const [state, setState] = useState({
    reviewAdd: {
      open: false,
      product: null as CartProduct | null,
    },
    reviewEdit: {
      open: false,
      product: null as CartProduct | null,
      review: null as IProductSubDetailReview | null,
    },
  });

  const subTotalPrice = useMemo(
    () => props.order?.products.reduce((acc, cur) => acc + cur.totalPrice, 0),
    [props.order]
  );

  const handleAddReview = (values: any) => {
    props.onAddProductReview(values).then(() => {
      setState((state) => ({
        ...state,
        reviewAdd: {
          open: false,
          product: null,
        },
      }));
    });
  };

  const handleEditReview = (values: any) => {
    props.onEditProductReview(values).then(() => {
      setState((state) => ({
        ...state,
        reviewEdit: {
          open: false,
          product: null,
          review: null,
        },
      }));
    });
  };

  const voteDesc = ['Tồi tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'];

  return (
    <>
      <div className="cr-track padding-b-100">
        <div className="container">
          <div className="cr-sidebar-wrap">
            <div className="cr-sidebar-block">
              <div className="cr-sb-block-content">
                <div className="cr-sb-block-content">
                  <div className="cr-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-center">Tổng giá</th>
                          <th className="text-center">Đánh giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.order?.products.map((product, index) => (
                          <tr key={index}>
                            <td className="cr-cart-name">
                              <div className="cr-cart-name-wrapper">
                                <Link
                                  to={ROUTER_PATH.productDetail.extract.replace(
                                    ':id',
                                    product.productId?.toString()
                                  )}
                                >
                                  <img
                                    src={product.thumbnailUrl}
                                    alt="product-1"
                                    className="cr-cart-img"
                                  />
                                </Link>
                                <div>
                                  <Link
                                    to={ROUTER_PATH.productDetail.extract.replace(
                                      ':id',
                                      product.productId?.toString()
                                    )}
                                  >
                                    {product.productName}
                                  </Link>
                                  <div className="cr-cart-desc">
                                    Màu sắc:
                                    <div className="cr-pro-color">
                                      <ul className="cr-opt-swatch cr-change-img">
                                        <li className="active">
                                          <a className="cr-opt-clr-img">
                                            <span style={{ backgroundColor: product.color }}></span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    Kích thước:
                                    <div className="cr-pro-size">
                                      <ul className="cr-opt-size">
                                        <li className="active">
                                          <a className="cr-opt-sz">{product.size}</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="cr-cart-qty">
                              <div className="cart-qty-plus-minus">
                                <button type="button" disabled className="plus">
                                  +
                                </button>
                                <input
                                  type="text"
                                  placeholder="."
                                  value={product.unit}
                                  minLength={1}
                                  maxLength={20}
                                  className="quantity"
                                />
                                <button type="button" disabled className="minus">
                                  -
                                </button>
                              </div>
                            </td>
                            <td className="cr-cart-qty">
                              <div
                                className="cart-qty-plus-minus"
                                style={{ border: 'none', width: 'fit-content' }}
                              >
                                {CurrencyUtils.formatCurrencyVND(product.totalPrice)}
                              </div>
                            </td>
                            <td className="cr-cart-qty">
                              <div
                                className={
                                  'cart-qty-plus-minus cr-review-link ' +
                                  (props.order?.status != ORDER_STATUS.COMPLETED ? '' : '')
                                }
                                style={{ border: 'none', width: 'fit-content' }}
                              >
                                {product.review ? (
                                  <span
                                    onClick={() =>
                                      setState((state) => ({
                                        ...state,
                                        reviewEdit: {
                                          open: true,
                                          product,
                                          review: product.review as IProductSubDetailReview,
                                        },
                                      }))
                                    }
                                  >
                                    <Popover
                                      placement="top"
                                      title={<span>Đánh giá của bản thân:</span>}
                                      content={
                                        <div>
                                          <p>
                                            Đánh giá:{' '}
                                            <Rate
                                              tooltips={voteDesc}
                                              value={product.review.rating}
                                              disabled={true}
                                            />
                                          </p>
                                          <p>Cảm nhận: {product.review.comment}</p>
                                        </div>
                                      }
                                    >
                                      <p>Sửa Đánh giá</p>
                                    </Popover>
                                  </span>
                                ) : (
                                  <span
                                    onClick={() =>
                                      setState((state) => ({
                                        ...state,
                                        reviewAdd: {
                                          open: true,
                                          product,
                                        },
                                      }))
                                    }
                                  >
                                    Đánh giá
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cr-sidebar-wrap">
            <div className="cr-sidebar-block">
              <div className="cr-sb-title">
                <h3 className="cr-sidebar-title">Tóm Tắt Đơn Hàng</h3>
              </div>
              <div className="cr-sb-block-content">
                <div className="cr-sb-block-content">
                  <div className="cr-checkout-summary">
                    <div>
                      <span className="text-left">Giá sản phẩm</span>
                      <span className="text-right">
                        {CurrencyUtils.formatCurrencyVND((subTotalPrice ?? 0) * 0.9)}
                      </span>
                    </div>
                    <div>
                      <span className="text-left">Thuế VAT (10%): </span>
                      <span className="text-right">
                        {CurrencyUtils.formatCurrencyVND((subTotalPrice ?? 0) * 0.1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-left">Phí vận chuyển</span>
                      <span className="text-right">
                        {CurrencyUtils.formatCurrencyVND(props.order?.shipFee)}
                      </span>
                    </div>
                    {props.order?.voucherCode && (
                      <div>
                        <span className="text-left">Voucher Charges</span>
                        <span className="text-right">{CurrencyUtils.formatCurrencyVND(20000)}</span>
                      </div>
                    )}
                    <div className="cr-checkout-summary-total">
                      <span className="text-left">Tổng tiền</span>
                      <span className="text-right">
                        {CurrencyUtils.formatCurrencyVND(props.order?.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderProductReviewAdd
        open={state.reviewAdd.open}
        productSubDetailId={state.reviewAdd.product?.productSubDetailId}
        productName={state.reviewAdd.product?.productName}
        onClose={() =>
          setState((state) => ({
            ...state,
            reviewAdd: {
              open: false,
              product: null,
            },
          }))
        }
        onSave={handleAddReview}
      />
      <OrderProductReviewEdit
        open={state.reviewEdit.open}
        productName={state.reviewEdit.product?.productName}
        review={state.reviewEdit.review}
        onClose={() =>
          setState((state) => ({
            ...state,
            reviewEdit: {
              open: false,
              product: null,
              review: null,
            },
          }))
        }
        onSave={handleEditReview}
      />
    </>
  );
};
export default OrderProductSection;
