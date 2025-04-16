import * as React from 'react';
import { IProductItemResponse, IProductSearchParam } from '~/dto';
import { useSearchParams } from 'react-router-dom';
import { productService } from '~/services';
import { CategorySelect } from '~/pages/Product/ProductList/components/CategorySelect.tsx';
import { SORT_BY_ENUM } from '~/constants';
import { ProductCard } from '~/components';

const DEFAULT_SEARCH_PARAMS: IProductSearchParam = {
  keyword: null,
  categoryId: null,
  sortBy: SORT_BY_ENUM.NEWEST,
  limit: 10,
  page: 0,
};

export const ProductList = () => {
  const [products, setProducts] = React.useState<IProductItemResponse[]>([]);
  const [data, setData] = React.useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    fetchProducts().then();
  }, []);

  React.useEffect(() => {
    fetchProducts().then();
  }, [searchParams]); // Theo dõi sự thay đổi của query param

  const buildSearchParams = (): IProductSearchParam => {
    return {
      keyword: searchParams.get('keyword') ?? DEFAULT_SEARCH_PARAMS.keyword,
      categoryId: searchParams.get('categoryId')
        ? Number(searchParams.get('categoryId'))
        : DEFAULT_SEARCH_PARAMS.categoryId,
      sortBy: (searchParams.get('sortBy') as SORT_BY_ENUM) ?? SORT_BY_ENUM.NEWEST,
      limit: Number(searchParams.get('limit')) || DEFAULT_SEARCH_PARAMS.limit,
      page: Number(searchParams.get('page')) || DEFAULT_SEARCH_PARAMS.page,
    };
  };

  const fetchProducts = async () => {
    const params = buildSearchParams();
    // @ts-ignore
    const model = { ...params, page: params.page + 1 };
    productService
      .search(model)
      .then((resp) => {
        console.log('re ', resp.data.data);
        setProducts(resp.data.data);
        setData(resp.data);
      })
      .catch((reason) => {
        console.log('error fetch product ', reason);
      });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortBy: event.target.value,
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: String(page),
    });
  };

  return (
    <div>
      <section className="section-shop padding-tb-100">
        <div className="container">
          <div className="row d-none">
            <div className="col-lg-12">
              <div
                className="mb-30"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="400"
              >
                <div className="cr-banner">
                  <h2>Categories</h2>
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
            <div
              className="col-12"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="600"
            >
              <div className="row">
                <div className="col-12">
                  <div className="cr-shop-bredekamp">
                    <div className="cr-toggle">
                      <a href="javascript:void(0)" className="shop_side_view">
                        <i className="ri-filter-line"></i>
                      </a>
                    </div>
                    <div className="center-content">
                      <div>
                        <CategorySelect />
                      </div>
                      <span>{products.length || 0} được tìm kiếm</span>
                    </div>
                    <div className="cr-select">
                      <label>Sắp xếp theo :</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleSortChange}
                      >
                        <option value={SORT_BY_ENUM.NEWEST}>Mới nhất</option>
                        <option value={SORT_BY_ENUM.LATEST}>Lâu nhất</option>
                        <option value={SORT_BY_ENUM.PRICE_ASC}>Giá tăng dần</option>
                        <option value={SORT_BY_ENUM.PRICE_DESC}>Giá giảm dần</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row col-50 mb-minus-24">
                {products.map((product: IProductItemResponse, index) => (
                  <div key={index} className="col-lg-3 col-6">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/*PAGINATION*/}
              <nav aria-label="..." className="cr-pagination">
                <ul className="pagination">
                  {[...Array(data?.totalPages || 1).keys()].map((page) => (
                    <li
                      key={page}
                      className={`page-item ${Number(searchParams.get('page')) === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      <span className="page-link">{page + 1}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
