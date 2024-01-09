"use client";

import { mangaFilterSort } from "~/redux/slices/manga-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
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
  const sort = useAppSelector((state) => state.manga.filter.sort);
  const dispatch = useAppDispatch();

  return (
    <>
      {sorts.map((item) => {
        const check = sort == item.value;

        return (
          <li
            key={item.value}
            className={`px-2 py-1 rounded cursor-pointer dark:text-white/75 font-bold ${
              check ? "bg-green-500/60" : "bg-stone-200 dark:bg-stone-800"
            }`}
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
