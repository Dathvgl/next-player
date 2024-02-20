"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Pagination from "~/components/pagination";
import { site } from "~/configs/site";
import { numChapter, timeFromNow } from "~/lib/convert";
import { MotionLi, MotionUl } from "~/lib/motion";
import { useAppSelector } from "~/redux/hook";
import { mangaFilterSelector } from "~/redux/selectors/manga-selector";
import { getMangaList } from "~/services/manga-service";
import { MangaList, MangaType } from "~/types/manga";
import MangaThumnailClient from "../../components/manga-thumnail-client";
import MangaListLoading from "./manga-list-loading";

export default function MangaList({ type }: { type: MangaType }) {
  const filter = useAppSelector(mangaFilterSelector);
  const [data, setData] = useState<MangaList>();
  const search = handleUrl();

  useEffect(() => {
    async function init() {
      setData(await getMangaList({ search }));
    }

    init();
  }, [search]);

  function handleUrl() {
    let str = `type=${type}`;

    for (const [key, value] of Object.entries(filter)) {
      if (typeof value == "string") {
        if (!value || value == "") continue;
      }

      if (Array.isArray(value)) {
        const length = value.length;
        for (let index = 0; index < length; index++) {
          str += `&${key}=${value[index]}`;
        }
      } else {
        str += `&${key}=${value}`;
      }
    }

    return str;
  }

  if (!data) return <MangaListLoading />;

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
              <Link href={`${site.story}/${type}/${item._id}`}>
                <MangaThumnailClient
                  className="h-[200px]"
                  fill
                  type={type}
                  id={item._id}
                  title={item.title}
                />
              </Link>
              <figcaption className="px-2 py-1">
                <Link href={`${site.story}/${type}/${item._id}`}>
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
                            href={`${site.story}/${type}/chapter/${item._id}/${child._id}`}
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
      <Pagination totalPage={data.totalPage} />
    </div>
  );
}
