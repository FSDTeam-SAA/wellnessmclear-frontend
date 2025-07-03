import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

type ServiceCardProps = {
  Icon?: React.ComponentType<{ className?: string }>;
  iconUrl?: string;
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
  iconUrl,
  title,
  description,
  price,
  href,
}: ServiceCardProps) => {
  return (
    <Card
      className={`shadow-none rounded-[8px] bg-[#F0F4F8] max-w-[275px] max-h-[305px]`}
    >
      <CardHeader className="space-y-[28px]">
        {Icon ? (
          <Icon className={`size-[32px] text-[#CBA0E3]`} />
        ) : iconUrl ? (
          <Image
            src={iconUrl}
            alt={title}
            width={32}
            height={32}
            className="size-[32px] object-cover rounded"
          />
        ) : null}
        <CardTitle className="text-[18px] font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-[#424242] space-y-[16px]">
        <p className="leading-[150%] font-normal text-[16px]">{description}</p>
        <p>
          Price:{" "}
          <span className="text-[#131313] leading-[150%] text-[20px] font-semibold">
            ${price}
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