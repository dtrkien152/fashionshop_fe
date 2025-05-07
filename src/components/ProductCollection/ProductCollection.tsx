import * as React from 'react';
import {ProductCard} from '~/components';
import {IProductItemResponse} from '~/dto';
import {productService} from '~/services';

interface Props {
}

const TABS = [
    {id: 'all', label: 'Tất cả', categories: null},
    {id: 'womens', label: 'Phụ nữ', categories: [2, 4]},
    {id: 'mens', label: 'Đàn ông', categories: [1, 3]},
    {id: 'accessories', label: 'Phụ kiện', categories: [5]},
];


const ProductCollection: React.FC<Props> = () => {
    const [products, setProducts] = React.useState<IProductItemResponse[]>([]);
    const [activeTab, setActiveTab] = React.useState<string>('all');
    React.useEffect(() => {
        const currentTab = TABS.find((tab) => tab.id === activeTab);
        fetchProducts(currentTab ? currentTab.categories : null);
    }, [activeTab]);

    // React.useEffect(() => {
    //   const currentTab = TABS.find((tab) => tab.id === activeTab);
    //   fetchProducts(currentTab ? currentTab.categories : null);
    //   // fetchProducts();
    // }, []);

    const fetchProducts = async (categoryIds: number[] | null) => {
        console.log(categoryIds)
        productService
            .getTopSelling(categoryIds)
            .then((resp) => {
                setProducts(resp.data.data);
            })
            .catch((reason) => {
                console.log('error fetch product ', reason);
            });
    };
    return (
        <section className="cr-product-tab cr-products padding-b-100 wow fadeInUp">
            <div className="container">
                <div className="row" data-aos="fade-up" data-aos-duration="2000">
                    <div className="col-lg-12">
                        <div className="title-2 mb-30">
                            <div className="title-box">
                                <div className="cr-banner">
                                    <h2>Top Sản phẩm bán chạy nhất</h2>
                                </div>
                                <div className="cr-banner-sub-title">
                                    <p>Mua sắm online bộ sưu tập top và nhận miễn phí vận chuyển!</p>
                                </div>
                            </div>
                            <div className="cr-pro-tab">
                                <ul className="cr-pro-tab-nav nav">
                                    {TABS.map((tab) => (
                                        <li className="nav-item" key={tab.id} style={{cursor: 'pointer'}}>
                                            <a
                                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                {tab.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-minus-24" data-aos="fade-up" data-aos-duration="2000">
                    <div className="col">
                        <div className="tab-content">
                            <div className="tab-pane fade show active product-block" id="all">
                                <div className="row">
                                    {products.map((item, i) => (
                                        <div key={i} className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                                            <ProductCard product={item}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="womens">
                                <div className="row">
                                    {products.map((item, i) => (
                                        <div key={i} className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                                            <ProductCard product={item}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="mens">
                                <div className="row">
                                    {products.map((item, i) => (
                                        <div key={i} className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                                            <ProductCard product={item}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="kids">
                                <div className="row">
                                    {products.map((item, i) => (
                                        <div key={i} className="col-md-4 col-sm-6 col-xs-6 cr-col-5 cr-product-box">
                                            <ProductCard product={item}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCollection;
