import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import productService from '~/services/product.service.ts';
import ProductSection from '~/pages/Product/ProductDetail/components/ProductSection.tsx';
import RecommendProducts from '~/pages/Product/ProductDetail/components/RecommendProducts.tsx';
import {IProductDetailResponse} from '~/dto';

const ProductDetail = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductDetailResponse>();

    useEffect(() => {
        if (!id) return;

        const fetchProductDetail = async () => {
            try {
                const response = await productService.getProductDetail(id);
                setProduct(response.data);
                console.log(response.data.data);
            } catch (e) {
                setProduct(undefined);
            }
        };

        fetchProductDetail();

        // Cuộn lên đầu trang khi id thay đổi
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [id]);

    return (
        <>
            <ProductSection products={product}/>
            {
                id && (
                    <RecommendProducts productId={Number(id)}/>
                )
            }
        </>
    );
};

export default ProductDetail;
