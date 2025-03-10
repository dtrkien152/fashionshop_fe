import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '~/services/product.service.ts';
import ProductSection from '~/pages/Product/ProductDetail/components/ProductSection.tsx';
import PopularProducts from '~/pages/Product/ProductDetail/components/PopularProducts.tsx';
import { IProductDetailResponse } from '~/shared/model/product.model.ts';


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
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
      } finally {
      }
    };

    fetchProductDetail().then();
  }, [id]);

  return (
    <>
      <ProductSection products={product}/>
      <PopularProducts />
    </>
  );
};

export default ProductDetail;
