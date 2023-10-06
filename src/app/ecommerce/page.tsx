import { Metadata } from "next";
import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { capitalize } from "~/lib/convert";
import { MotionUl, MotionLi } from "~/lib/motion";

const ecommerceList = [
  {
    type: "fake-store-api",
    icon: "/ecommerce/fake-store-api-favicon.png",
  },
];

export const metadata: Metadata = {
  title: "Ecommerce mãi mãi là gian nan",
};

export default function Page() {
  return (
    <MotionUl
      className="flex justify-center items-center gap-4 h-[calc(100vh-65px)]"
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      }}
    >
      {ecommerceList.map((item) => (
        <HoverCard key={item.type}>
          <HoverCardTrigger asChild>
            <Link href={`/ecommerce/${item.type}`}>
              <MotionLi
                className="bg-white dark:bg-black flex justify-center items-center rounded-lg border-2 p-2 overflow-hidden"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                whileHover={{
                  position: "relative",
                  zIndex: 1,
                  scale: 1.2,
                  transition: { duration: 0.2 },
                }}
              >
                <CustomImage
                  className="w-12 h-12"
                  fill
                  src={item.icon}
                  alt={item.type}
                  objectFit="cover"
                />
              </MotionLi>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-min whitespace-nowrap">
            {capitalize(item.type)}
          </HoverCardContent>
        </HoverCard>
      ))}
    </MotionUl>
  );
}
