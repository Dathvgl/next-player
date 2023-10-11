"use client";

import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { mangaFilterKeyword } from "~/redux/features/manga-slice";
import { useAppDispatch } from "~/redux/hook";
import { MangaTag } from "~/types/manga";
import MangaFilterDetail from "./manga-filter-detail";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MangaFilter({ list }: { list?: MangaTag[] }) {
  const [inputName, setInputName] = useState<string>("");
  const name = useDebounce(inputName);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    dispatch(mangaFilterKeyword(name));

    if (name) {
      params.set("keyword", name);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete("keyword");
      const result = params.toString();

      if (!result || result == "") router.push(pathname);
      else router.push(`${pathname}?${result}`);
    }
  }, [name]);

  function clearSearch() {
    setInputName(() => "");
  }

  if (!list) return <></>;

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center px-2 gap-1 relative border rounded">
        <LIcon icon={Search} />
        <Input
          className="flex-1 border-0 no-focus-tw-ring"
          placeholder="Search name"
          value={inputName}
          onChange={(event) => setInputName(() => event.target.value)}
        />
        {name && (
          <div onClick={clearSearch}>
            <LIcon icon={X} button />
          </div>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-3 gap-1 rounded-3xl">
            <LIcon icon={Filter} />
            <span>Lọc</span>
          </Button>
        </DialogTrigger>
        <MangaFilterDetail list={list} />
      </Dialog>
    </div>
  );
}
