import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import productService from '~/services/product.service.ts';
import ProductSection from '~/pages/Product/ProductDetail/components/ProductSection.tsx';
import RecommendProducts from '~/pages/Product/ProductDetail/components/RecommendProducts.tsx';
import {IProductDetailResponse} from '~/dto';

const ProductDetail = () => {
    const {code} = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductDetailResponse>();

    useEffect(() => {
        if (!code) return;

        const fetchProductDetail = async () => {
            try {
                const response = await productService.getProductDetail(code);
                setProduct(response.data);
                console.log(response.data.data);
            } catch (e) {
                setProduct(undefined);
            }
        };

        fetchProductDetail();

        // Cuộn lên đầu trang khi id thay đổi
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [code]);

    return (
        <>
            <ProductSection products={product}/>
            {
                code && (
                    <RecommendProducts productId={Number(code)}/>
                )
            }
        </>
    );
};

export default ProductDetail;
