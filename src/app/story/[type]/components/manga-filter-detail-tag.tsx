"use client";

import { capitalize } from "~/lib/convert";
import { cn } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import {
  mangaFilterExcludeSelector,
  mangaFilterIncludeSelector,
} from "~/redux/selectors/manga-selector";
import {
  mangaFilterExclude,
  mangaFilterInclude,
  mangaFilterNoclude,
} from "~/redux/slices/manga-slice";
import { MangaTag } from "~/types/manga";

export function MangaFilterDetailTag({ list }: { list: MangaTag[] }) {
  const includes = useAppSelector(mangaFilterIncludeSelector);
  const excludes = useAppSelector(mangaFilterExcludeSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {list
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => {
          const inc = includes.includes(item._id);
          const exc = excludes.includes(item._id);

          return (
            <li
              key={item._id}
              className={cn(
                "px-2 py-1 rounded cursor-pointer dark:text-white/75 font-bold",
                inc
                  ? "bg-green-500/60"
                  : exc
                  ? "bg-red-500/60"
                  : "bg-stone-200 dark:bg-stone-800"
              )}
              onClick={() => {
                if (!inc && !exc) {
                  dispatch(mangaFilterInclude(item._id));
                } else {
                  if (inc && !exc) {
                    dispatch(mangaFilterExclude(item._id));
                  } else {
                    dispatch(mangaFilterNoclude(item._id));
                  }
                }
              }}
            >
              {capitalize(item.name)}
            </li>
          );
        })}
    </>
  );
}
