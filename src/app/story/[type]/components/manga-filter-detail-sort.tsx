"use client";

import { cn } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { mangaFilterSortSelector } from "~/redux/selectors/manga-selector";
import { mangaFilterSort } from "~/redux/slices/manga-slice";
import { MangaSort } from "~/types/manga";

const sorts: { name: string; value: MangaSort }[] = [
  {
    name: "Mới nhất",
    value: "lastest",
  },
  {
    name: "Theo tên",
    value: "name",
  },
  {
    name: "Số chapter",
    value: "chapter",
  },
];

export function MangaFilterDetailSort() {
  const sort = useAppSelector(mangaFilterSortSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {sorts.map((item) => {
        const check = sort == item.value;

        return (
          <li
            key={item.value}
            className={cn(
              "px-2 py-1 rounded cursor-pointer dark:text-white/75 font-bold",
              check ? "bg-green-500/60" : "bg-stone-200 dark:bg-stone-800"
            )}
            onClick={() => {
              if (check) return;
              dispatch(mangaFilterSort(item.value));
            }}
          >
            {item.name}
          </li>
        );
      })}
    </>
  );
}
