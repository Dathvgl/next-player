import { Metadata } from "next";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { capitalize } from "~/lib/convert";
import { MotionLi, MotionUl } from "~/lib/motion";

const codeList = [
  {
    type: "evervault",
  },
  {
    type: "audio-visualization",
  },
];

export const metadata: Metadata = {
  title: "Chỉ một vài code thú vị 🐧",
};

export default function Page() {
  return (
    <MotionUl
      className="flex p-6"
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
      {codeList.map((item) => (
        <HoverCard key={item.type}>
          <HoverCardTrigger asChild>
            <Link href={`/code/${item.type}`}>
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
                {capitalize(item.type)}
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
