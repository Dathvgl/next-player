"use client";

import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { mangaFilterOrderSelector } from "~/redux/selectors/manga-selector";
import { mangaFilterOrder } from "~/redux/slices/manga-slice";
import { MangaOrder } from "~/types/manga";

const orders: { name: string; value: MangaOrder }[] = [
  {
    name: "Tăng dần",
    value: "asc",
  },
  {
    name: "Giảm dần",
    value: "desc",
  },
];

export function MangaFilterDetailOrder() {
  const order = useAppSelector(mangaFilterOrderSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {orders.map((item) => {
        const check = order == item.value;

        return (
          <li
            key={item.value}
            className={`px-2 py-1 rounded cursor-pointer dark:text-white/75 font-bold ${
              check ? "bg-green-500/60" : "bg-stone-200 dark:bg-stone-800"
            }`}
            onClick={() => {
              if (check) return;
              dispatch(mangaFilterOrder(item.value));
            }}
          >
            {item.name}
          </li>
        );
      })}
    </>
  );
}
