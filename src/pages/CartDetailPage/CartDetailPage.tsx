import { IMAGES } from '~/images';

const CartDetailPage = () => {
  const products = [
    {
      id: 1,
      category: 'Women Tops',
      title: 'Colorful top for women',
      price: '$6.00',
      oldPrice: '$9.00',
      flag: {
        type: 'sale',
        value: '50% Sale',
      },
      images: [IMAGES.product.image18, IMAGES.product.image19],
      colors: ['#74c7ff', '#f39fab'],
      size: ['M', 'L', 'XL'],
    },
    {
      id: 2,
      category: 'Men T-shirt',
      title: 'Blue T-shirt for men',
      price: '$11.00',
      oldPrice: '$22.00',
      flag: {
        type: 'trending',
        value: 'Trending',
      },
      images: [IMAGES.product.image30, IMAGES.product.image29],
      colors: ['#74c7ff'],
      size: ['M', 'XL'],
    },
    {
      id: 3,
      category: 'Kids',
      title: 'Pink T-shirt for girl',
      price: '$29.00',
      oldPrice: '$39.00',
      images: [IMAGES.product.image24, IMAGES.product.image25],
      colors: ['#74c7ff', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 4,
      category: 'Shorts',
      title: 'Girl nightdress shorts',
      price: '$57.00',
      oldPrice: '$62.00',
      flag: {
        type: 'new',
        value: 'New',
      },
      images: [IMAGES.product.image20, IMAGES.product.image21],
      colors: ['#50aae7', '#f2f05f'],
      size: ['S', 'M'],
    },
    {
      id: 5,
      category: 'T-shirt',
      title: 'Black T-shirt for women',
      price: '$35.00',
      oldPrice: '$42.00',
      images: [IMAGES.product.image22, IMAGES.product.image23],
      colors: ['#000000', '#837aff'],
      size: ['S', 'M'],
    },
  ];

  return (
    <section className="section-cart padding-tb-100">
      <div className="container">
        <div className="row d-none">
          <div className="col-lg-12">
            <div className="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="cr-banner">
                <h2>Cart</h2>
              </div>
              <div className="cr-banner-sub-title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore lacus vel facilisis.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="cr-cart-content"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <div className="row">
                <form action="#">
                  <div className="cr-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>price</th>
                          <th className="text-center">Quantity</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index}>
                            <td className="cr-cart-name">
                              <a href="javascript:void(0)">
                                <img
                                  src={product.images[0]}
                                  alt="product-1"
                                  className="cr-cart-img"
                                />
                                {product.title}
                              </a>
                            </td>
                            <td className="cr-cart-price">
                              <span className="amount">{product.price}</span>
                            </td>
                            <td className="cr-cart-qty">
                              <div className="cart-qty-plus-minus">
                                <button type="button" className="plus">
                                  +
                                </button>
                                <input
                                  type="text"
                                  placeholder="."
                                  value="1"
                                  minLength={1}
                                  maxLength={20}
                                  className="quantity"
                                />
                                <button type="button" className="minus">
                                  -
                                </button>
                              </div>
                            </td>
                            <td className="cr-cart-subtotal">{product.price}</td>
                            <td className="cr-cart-remove">
                              <a href="javascript:void(0)">
                                <i className="ri-delete-bin-line"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cr-cart-update-bottom">
                        <a href="javascript:void(0)" className="cr-links">
                          Continue Shopping
                        </a>
                        <a href="cart.html" className="cr-button">
                          Check Out
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CartDetailPage;
