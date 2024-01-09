import { Skeleton } from "~/components/ui/skeleton";
import { MotionLi } from "~/lib/motion";

export default function MangaListLoading() {
  return (
    <ul className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <MotionLi
            key={index}
            className="bg-white dark:bg-black"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              position: "relative",
              zIndex: 1,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            <figure className="w-full rounded-lg border-2 overflow-hidden">
              <Skeleton className="w-full h-[200px] bg-stone-400" />
              <figcaption className="py-1 flex flex-col gap-1">
                <Skeleton className="w-full h-[24px] bg-stone-400" />
                <ul className="flex flex-col gap-1">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-6 h-4"
                      >
                        <Skeleton className="flex-1 h-full bg-stone-400" />
                        <Skeleton className="w-[60%] h-full bg-stone-400" />
                      </li>
                    ))}
                </ul>
              </figcaption>
            </figure>
          </MotionLi>
        ))}
    </ul>
  );
}
