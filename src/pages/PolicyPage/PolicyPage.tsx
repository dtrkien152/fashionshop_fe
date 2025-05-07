import { IMAGES } from '~/images';
import { useState } from 'react';

const PolicyPage = () => {
  const [policyIdShow, setPolicyIdShow] = useState(1);

  return (
    <section className="section-faq padding-tb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="cr-faq-img">
              <img src={IMAGES.instagram.image15} alt="about" />
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="cr-faq"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-1"
                    onClick={() => setPolicyIdShow(1)}
                  >
                    <button
                      className="accordion-button shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                    >
                      Tôi có thể đổi trả sản phẩm trong thời gian bao lâu sau khi nhận hàng?
                    </button>
                  </h2>
                  <div
                    id="collapse-1"
                    className={'accordion-collapse collapse ' + (policyIdShow === 1 ? 'show' : '')}
                    aria-labelledby="heading-1"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Bạn có thể yêu cầu đổi trả trong vòng 7 ngày kể từ khi nhận được sản phẩm.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-2"
                    onClick={() => setPolicyIdShow(2)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-2"
                      aria-expanded="false"
                      aria-controls="collapse-2"
                    >
                      Điều kiện để sản phẩm được đổi/trả là gì?
                    </button>
                  </h2>
                  <div
                    id="collapse-2"
                    className={'accordion-collapse collapse ' + (policyIdShow === 2 ? 'show' : '')}
                    aria-labelledby="heading-2"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng.</li>
                        <li>Đầy đủ phụ kiện, quà tặng kèm (nếu có).</li>
                        <li>Bao bì, tem mác, hóa đơn (nếu có) còn nguyên.</li>
                        <li>
                          <strong>Bắt buộc có video quay rõ quá trình mở hàng</strong> để làm bằng
                          chứng đối chiếu khi yêu cầu đổi trả.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-3"
                    onClick={() => setPolicyIdShow(3)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-3"
                      aria-expanded="false"
                      aria-controls="collapse-3"
                    >
                      Khi nào tôi không được đổi/trả sản phẩm?
                    </button>
                  </h2>
                  <div
                    id="collapse-3"
                    className={'accordion-collapse collapse ' + (policyIdShow === 3 ? 'show' : '')}
                    aria-labelledby="heading-3"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Quá thời gian quy định.</li>
                        <li>Sản phẩm đã qua sử dụng, bị hư hỏng do người dùng.</li>
                        <li>
                          Các sản phẩm thuộc nhóm không hỗ trợ đổi trả (ví dụ: sản phẩm khuyến mãi,
                          sản phẩm vệ sinh cá nhân...).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-4"
                    onClick={() => setPolicyIdShow(4)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-4"
                      aria-expanded="false"
                      aria-controls="collapse-4"
                    >
                      Tôi cần làm gì để yêu cầu đổi trả?
                    </button>
                  </h2>
                  <div
                    id="collapse-4"
                    className={'accordion-collapse collapse ' + (policyIdShow === 4 ? 'show' : '')}
                    aria-labelledby="heading-4"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Nhắn tin trực tiếp cho cửa hàng thông qua box chat của đơn hàng.</li>
                        <li>
                          Cung cấp đầy đủ: mã đơn hàng, lý do đổi/trả, hình ảnh/video sản phẩm.
                        </li>
                        <li>
                          Không có nút yêu cầu đổi/trả tự động — vui lòng liên hệ thủ công để được
                          hỗ trợ nhanh nhất.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-5"
                    onClick={() => setPolicyIdShow(5)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-5"
                      aria-expanded="false"
                      aria-controls="collapse-5"
                    >
                      Tôi có phải trả phí đổi/trả hàng không?
                    </button>
                  </h2>
                  <div
                    id="collapse-5"
                    className={'accordion-collapse collapse ' + (policyIdShow === 5 ? 'show' : '')}
                    aria-labelledby="heading-5"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Miễn phí nếu lỗi từ phía cửa hàng (giao sai hàng, hàng lỗi).</li>
                        <li>
                          Nếu đổi/trả vì lý do cá nhân (không thích, chọn nhầm...), bạn có thể cần
                          tự thanh toán phí vận chuyển.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-6"
                    onClick={() => setPolicyIdShow(6)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-6"
                      aria-expanded="false"
                      aria-controls="collapse-6"
                    >
                      Sau khi gửi yêu cầu, bao lâu thì tôi nhận được phản hồi?
                    </button>
                  </h2>
                  <div
                    id="collapse-6"
                    className={'accordion-collapse collapse ' + (policyIdShow === 6 ? 'show' : '')}
                    aria-labelledby="heading-6"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng <strong>24-48 giờ</strong>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-7"
                    onClick={() => setPolicyIdShow(7)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-7"
                      aria-expanded="false"
                      aria-controls="collapse-7"
                    >
                      Tôi sẽ nhận lại tiền bằng cách nào nếu đổi/trả thành công?
                    </button>
                  </h2>
                  <div
                    id="collapse-7"
                    className={'accordion-collapse collapse ' + (policyIdShow === 7 ? 'show' : '')}
                    aria-labelledby="heading-7"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Ví điện tử (nếu thanh toán online).</li>
                        <li>Tài khoản ngân hàng.</li>
                        <li>Hoặc theo phương thức ban đầu bạn đã thanh toán.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="heading-8"
                    onClick={() => setPolicyIdShow(8)}
                  >
                    <button
                      className="accordion-button collapsed shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-8"
                      aria-expanded="false"
                      aria-controls="collapse-8"
                    >
                      Tôi có thể đổi sản phẩm khác không?
                    </button>
                  </h2>
                  <div
                    id="collapse-8"
                    className={'accordion-collapse collapse ' + (policyIdShow === 8 ? 'show' : '')}
                    aria-labelledby="heading-8"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Có. Bạn có thể yêu cầu đổi sang sản phẩm khác cùng giá trị hoặc cao hơn (bù
                        thêm tiền nếu có chênh lệch).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PolicyPage;
