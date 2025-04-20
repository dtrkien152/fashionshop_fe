import {
    BlogSwiper,
    CategorySwiper,
    DealBanner,
    HeroSwiper, InstagramSwiper,
    ProductBanner,
    ProductCollection,
    ProductSwiper,
    ServiceBox,
} from '~/components';
import React from "react";
import {ProductCategoryList} from "~/components/ProductCategoryList/TopProductCategory.tsx";

const HomePage = () => {
    return (
        <>
            <HeroSwiper/>
            <CategorySwiper/>
            <ProductCategoryList/>
            <ProductSwiper/>
            <ServiceBox/>
            <DealBanner/>
            <ProductBanner/>
            <ProductCollection/>
            <BlogSwiper/>
            <InstagramSwiper/>
        </>
    );
};
export default HomePage;
