import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type ServiceCardProps = {
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  price: string | number;
  buttonText: string;
  href: string;
  backgroundColor: string;
};

const ServiceCard = ({
  Icon,
  iconColor,
  title,
  description,
  price,
  href,
  backgroundColor,
}: ServiceCardProps) => {
  return (
    <Card
      className={`${backgroundColor} shadow-none rounded-[8px] max-w-[275px] max-h-[305px]`}
    >
      <CardHeader className="space-y-[28px]">
        <Icon className={`${iconColor} size-[32px]`} />
        <CardTitle className="text-[18px] font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-[#424242] space-y-[16px]">
        <p className="leading-[150%] font-normal text-[16px]">{description}</p>
        <p>
          Price:{" "}
          <span className="text-[#131313] leading-[150%] font-semibold">
            {price}
          </span>
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button className="text-white flex-1" asChild>
          <Link href="/">Book A Coach</Link>
        </Button>
        <button className="text-[#CBA0E3] flex-1">
          <Link href={href}>See Details</Link>
        </button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
