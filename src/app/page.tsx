import { auth } from "@/auth";
import ServiceCard from "@/components/cards/service-card";
import HomeHero from "@/components/Home/HomeHero/HomeHero";
import SendMessage from "@/components/Home/HomeHero/SendMessage";
import WellnessVault from "@/components/Home/HomeHero/WellnessVault";
import SignOut from "@/components/signout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const cu = await auth();

  return (
    <>
    <div>
      <HomeHero />
      <SendMessage />
      <WellnessVault />
    </div>

      <div className="container mx-auto grid grid-cols-4 gap-5 mt-[200px]">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
      <div className="w-full flex items-center justify-center mt-20">
        {cu ? (
          <SignOut />
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}
