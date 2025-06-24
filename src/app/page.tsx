import ServiceCard from "@/components/cards/service-card";

export default function Home() {
  return (
    <div className="container mx-auto grid grid-cols-4 gap-5 mt-[200px]">
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
    </div>
  );
}
