import FeaturedProducts from "../../components/Home/FeatureProducts";
import HeroSection from "../../components/Home/HeroSection";
import ProductCategories from "../../components/Home/ProductCategories";
import ShopByBrand from "../../components/Home/ShopByBrand";
import TrendingProducts from "../../components/Home/TrendingProducts";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <TrendingProducts />
      <ShopByBrand />
    </div>
  );
};

export default Home;
