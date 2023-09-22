import { Metadata } from "next";
import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import { MotionUl, MotionLi } from "~/lib/motion";

const musicList = [
  {
    type: "zingMP3",
    icon: "/music/zing-mp3-favicon.png",
  },
];

export const metadata: Metadata = {
  title: "Nghe nhạc",
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
      {musicList.map((item) => (
        <Link key={item.type} href={`/music/${item.type}`}>
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
      ))}
    </MotionUl>
  );
}
