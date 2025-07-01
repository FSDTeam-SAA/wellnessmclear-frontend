import HomeHero from "@/app/(website)/_components/HomeHero";
import SendMessage from "@/app/(website)/_components/SendMessage";
import WellnessServices from "@/app/(website)/_components/WellnessServices";
import WellnessVault from "@/app/(website)/_components/WellnessVault";
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
