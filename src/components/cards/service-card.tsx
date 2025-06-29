import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain } from "lucide-react";
import Link from "next/link";

const ServiceCard = () => {
  return (
    <Card className="bg-[#F0F4F8] shadow-none rounded-[8px] max-w-[275px] ">
      <CardHeader className="space-y-[28px]">
        <Brain className="text-[#CBA0E3] size-[32px]" />
        <CardTitle className="text-[18px] font-semibold ">
          Clarity Health Audit
        </CardTitle>
      </CardHeader>

      <CardContent className="text-[#424242] space-y-[16px]">
        <p className="leading-[150%] font-normal text-[16px] ">
          (1:1 Foundational Session – 60 mins)
        </p>

        <p>
          Price:{" "}
          <span className="text-[#131313] leading-[150%] font-semibold">
            $150
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="text-white w-full" asChild>
          <Link href="/fsdfs">Book a Coach</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
