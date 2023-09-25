import Link from "next/link";
import { Fragment } from "react";
import MangaThumnail from "~/components/manga-thumnail";
import Pagination from "~/components/pagination";
import { externalApi } from "~/lib/api";
import { numChapter, timeFromNow } from "~/lib/convert";
import { MotionLi, MotionUl } from "~/lib/motion";
import { MangaList } from "~/types/manga";

export default async function MangaList({ type }: { type: string }) {
  const res = await fetch(
    `${externalApi.manga}/list?type=${type}&sort=desc&order=lastest`,
    { next: { revalidate: 3600 } }
  );

  const data: MangaList = await res.json();

  return (
    <div className="flex flex-col gap-4">
      <MotionUl
        className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4"
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
        {data.data.map((item) => (
          <MotionLi
            key={item._id}
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
              <Link href={`/truyen-tranh/${type}/${item._id}`}>
                <MangaThumnail
                  className="h-[200px]"
                  fill
                  type={type}
                  id={item._id}
                  title={item.title}
                />
              </Link>
              <figcaption className="px-2 py-1">
                <Link href={`/truyen-tranh/${type}/${item._id}`}>
                  <strong className="line-clamp-2">
                    {item.title}
                    <p className="text-transparent select-none">line</p>
                  </strong>
                </Link>
                {!item.chapters.length ? (
                  <ul>
                    {[0, 0, 0].map((_, index) => (
                      <li key={index} className="text-transparent select-none">
                        line
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {item.chapters.map((child, index, { length }) => {
                      const el = (
                        <li className="flex justify-between gap-4">
                          <Link
                            href={`/truyen-tranh/${type}/chapter/${item._id}/${child._id}`}
                          >
                            {numChapter(child.chapter)}
                          </Link>
                          <i className="text-stone-400">
                            {timeFromNow(child.time)}
                          </i>
                        </li>
                      );

                      if (index == length - 1 && length < 3) {
                        return (
                          <Fragment key={`fill-${child._id}-${length - index}`}>
                            {el}
                            {Array(3 - length)
                              .fill(0)
                              .map((item, index) => (
                                <li
                                  key={`${item}-${index}`}
                                  className="text-transparent select-none"
                                >
                                  line
                                </li>
                              ))}
                          </Fragment>
                        );
                      } else
                        return (
                          <Fragment key={`full-${child._id}-${index}`}>
                            {el}
                          </Fragment>
                        );
                    })}
                  </ul>
                )}
              </figcaption>
            </figure>
          </MotionLi>
        ))}
      </MotionUl>
      <Pagination total={data.totalPage} />
    </div>
  );
}
