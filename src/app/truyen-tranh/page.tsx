import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import PageTransition from "~/components/page-transition";
import { MotionLi, MotionUl } from "~/lib/motion";

export const mangaTypes = [
  {
    type: "blogtruyen",
    icon: "/manga/blogtruyen-favicon.png",
  },
];

export default function Page() {
  return (
    <PageTransition>
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
        {mangaTypes.map((item) => (
          <MotionLi
            key={item.type}
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
            <Link href={`/truyen-tranh/${item.type}`}>
              <CustomImage
                className="w-12 h-12"
                fill
                src={item.icon}
                alt={item.type}
                objectFit="cover"
              />
            </Link>
          </MotionLi>
        ))}
      </MotionUl>
    </PageTransition>
  );
}
