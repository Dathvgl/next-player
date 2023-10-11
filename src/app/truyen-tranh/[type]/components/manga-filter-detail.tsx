"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DialogContent } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { mangaFilterInit } from "~/redux/features/manga-slice";
import { useAppDispatch } from "~/redux/hook";
import { MangaTag } from "~/types/manga";
import { MangaFilterDetailOrder } from "./manga-filter-detail-order";
import { MangaFilterDetailSave } from "./manga-filter-detail-save";
import { MangaFilterDetailSort } from "./manga-filter-detail-sort";
import { MangaFilterDetailTag } from "./manga-filter-detail-tag";

export const orders: { name: string; value: "asc" | "desc" }[] = [
  {
    name: "Ascending",
    value: "asc",
  },
  {
    name: "Descending",
    value: "desc",
  },
];

export default function MangaFilterDetail({ list }: { list: MangaTag[] }) {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const params = new URLSearchParams(searchParams);

  const keyword = params.get("keyword");

  const order = params.get("order");
  const sort = params.get("sort");

  const includes = params.getAll("includes");
  const excludes = params.getAll("excludes");

  useEffect(() => {
    onClose();
  }, []);

  function onClose() {
    dispatch(mangaFilterInit({ keyword, order, sort, includes, excludes }));
  }

  return (
    <DialogContent
      className="!w-[80%] !h-[80%] max-w-none [&>button]:hidden"
      onInteractOutside={onClose}
      onEscapeKeyDown={onClose}
    >
      <ScrollArea className="select-none">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <h1 className="flex-1 font-bold text-xl">Lọc truyện</h1>
            <div className="flex gap-2">
              <MangaFilterDetailSave />
              <DialogClose onClick={onClose}>Close</DialogClose>
            </div>
          </div>
          <div className="flex gap-2">
            <h2 className="text-lg w-20">Thứ tự</h2>
            <ul className="flex gap-2">
              <MangaFilterDetailOrder />
            </ul>
          </div>
          <div className="flex gap-2">
            <h2 className="text-lg w-20">Sắp xếp</h2>
            <ul className="flex gap-2">
              <MangaFilterDetailSort />
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg">Thể loại</h2>
            <ul className="flex gap-2 items-center flex-wrap">
              <MangaFilterDetailTag list={list} />
            </ul>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
