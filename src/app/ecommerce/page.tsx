import { Metadata } from "next";
import Link from "next/link";
import { CustomImage } from "~/components/custom-image/custom-image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { site } from "~/configs/site";
import { ecommerceListType } from "~/configs/site-nested";
import { capitalize } from "~/lib/convert";
import { MotionLi, MotionUl } from "~/lib/motion";

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
      {ecommerceListType.map((item) => (
        <HoverCard key={item.type}>
          <HoverCardTrigger asChild>
            <Link href={`${site.ecommerce}/${item.type}`}>
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
          <HoverCardContent className="w-min whitespace-nowrap px-2 py-1">
            {capitalize(item.type)}
          </HoverCardContent>
        </HoverCard>
      ))}
    </MotionUl>
  );
}
