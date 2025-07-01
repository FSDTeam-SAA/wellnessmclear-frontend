// import { auth } from "@/auth";

import HomeHero from "@/components/Home/HomeHero/HomeHero";
import SendMessage from "@/components/Home/HomeHero/SendMessage";
import WellnessServices from "@/components/Home/HomeHero/WellnessServices";
import WellnessVault from "@/components/Home/HomeHero/WellnessVault";
import MostPopular from "@/components/products/most-popular";
import NewArrivals from "@/components/products/new-arrivals";
import ShopByCategory from "@/components/products/shop-by-category";

export default async function Home() {
  // const cu = await auth();

  return (
    <>
      <div>
        <HomeHero />
        <WellnessServices />
        <WellnessVault />
        <NewArrivals />
        <MostPopular />
        <ShopByCategory />
        <SendMessage />
      </div>
      {/* <div className="w-full flex items-center justify-center mt-20">
        {cu ? (
          <SignOut />
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div> */}
    </>
  );
}
