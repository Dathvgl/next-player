"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { externalApi } from "~/lib/api";
import { durationUTC } from "~/lib/convert";
import { ZingMP3Search } from "~/types/music/zingMP3/zingMP3";

export default function ZingMP3Search() {
  const [inputName, setInputName] = useState<string>("");
  const name = useDebounce(inputName);

  const cachedList = useMemo(() => <ZingMP3SearchList name={name} />, [name]);

  function clearSearch() {
    setInputName(() => "");
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center px-2 gap-1 w-1/3 max-md:w-full relative border rounded">
        <LIcon icon={Search} />
        <Input
          className="flex-1 border-0"
          placeholder="Search name"
          value={inputName}
          onChange={(event) => setInputName(() => event.target.value)}
        />
        {name && (
          <div onClick={clearSearch}>
            <LIcon icon={X} button />
          </div>
        )}
        {name && cachedList}
      </div>
    </div>
  );
}

function ZingMP3SearchList({ name }: { name: string }) {
  const router = useRouter();
  const [data, setData] = useState<ZingMP3Search>();

  useEffect(() => {
    async function init() {
      if (name) {
        await fetch(`${externalApi.musicZingMP3}/search/${name}`).then(
          async (res) => {
            setData(await res.json());
          }
        );
      }
    }

    init();
  }, [name]);

  function song(id: string) {
    const url = new URL(location.href);
    url.searchParams.set("id", id);
    router.push(url.href);
  }

  return (
    <div className="px-2 border py-1.5 font-bold absolute top-full left-0 w-full z-[21] rounded-lg bg-white dark:bg-black">
      {!data ? (
        <>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="px-2 py-1.5 h-[60px] gap-2 flex justify-between items-center"
              >
                <Skeleton className="w-12 h-full bg-stone-300" />
                <div className="flex-1 flex flex-col gap-2 h-full">
                  <Skeleton className="w-full flex-1 bg-stone-300" />
                  <Skeleton className="w-full flex-1 bg-stone-300" />
                </div>
              </div>
            ))}
        </>
      ) : !data.data.songs || data.data.songs?.length == 0 ? (
        "No results"
      ) : (
        <ScrollArea className="absolute top-full left-0 w-full h-64 z-[21] rounded-lg overflow-y-auto">
          {data.data.songs.map((item, index) => (
            <div
              key={index}
              className="px-2 py-1.5 cursor-pointer gap-2 flex justify-between items-center hover:bg-black hover:bg-opacity-20 group group/icon"
              onClick={() => song(item.encodeId)}
            >
              <div className="w-12 h-12 rounded overflow-hidden">
                <CustomImage
                  className="h-full"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>
              <div className="text-sm flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-base line-clamp-1">
                    {item.title}
                  </div>
                  <i>{durationUTC(item.duration)}</i>
                </div>
                <div className="line-clamp-1">
                  {item.artists?.map(({ name }) => name).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
