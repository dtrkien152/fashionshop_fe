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

const HomePage = () => {
  return (
    <>
      <HeroSwiper />
      <CategorySwiper />
      <ProductSwiper />
      <ServiceBox />
      <DealBanner />
      <ProductBanner />
      <ProductCollection />
      <BlogSwiper />
      <InstagramSwiper />
    </>
  );
};
export default HomePage;
