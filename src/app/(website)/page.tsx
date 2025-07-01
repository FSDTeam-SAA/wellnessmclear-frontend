import HomeHero from "@/components/Home/HomeHero/HomeHero";
import SendMessage from "@/components/Home/HomeHero/SendMessage";
import WellnessServices from "@/components/Home/HomeHero/WellnessServices";
import WellnessVault from "@/components/Home/HomeHero/WellnessVault";
import MostPopular from "@/components/products/most-popular";
import NewArrivals from "@/components/products/new-arrivals";
import ShopByCategory from "@/components/products/shop-by-category";

export default function Home() {
  return (
    <div>
        <HomeHero />
        <WellnessServices />
        <WellnessVault />
        <NewArrivals />
        <MostPopular />
        <ShopByCategory />
        <SendMessage />
      </div>
  );
}
