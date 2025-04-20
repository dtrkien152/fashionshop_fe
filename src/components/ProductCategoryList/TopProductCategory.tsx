import * as React from "react";
import {Props} from "~/pages/Product/ProductDetail/components/ProductAttributes.tsx";
import {ProductCategoryFemale, ProductCategoryMale} from "~/components/ProductCategoryList/index.ts";
import ProductAccessoryCategory from "~/components/ProductCategoryList/components/ProductAccessoryCategory.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const ProductCategoryList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleNavigate=(categoryId: any) => {
        searchParams.set('categoryId', categoryId.toString());
        searchParams.set('page', '0'); // Reset về trang đầu tiên
        navigate(`/product?${searchParams.toString()}`);
    }
    return (
        <>
            <ProductCategoryFemale handleNavigate={handleNavigate}/>
            <ProductAccessoryCategory handleNavigate={handleNavigate}/>
            <ProductCategoryMale handleNavigate={handleNavigate}/>
        </>
    )
}
