import { ListMusic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { externalApi } from "~/lib/api";
import { durationUTC } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { useAppSelector } from "~/redux/hook";
import {
  ZingMP3SongObject,
  ZingMP3SongResponse,
} from "~/types/music/zingMP3/song";

export default function PlayerLastList() {
  const router = useRouter();
  const id = useAppSelector((state) => state.music.zingMP3.current.id);
  const list = useAppSelector((state) => state.music.zingMP3.list);
  const [array, setArray] = useState<ZingMP3SongObject[]>([]);

  useEffect(() => {
    async function init() {
      const filter = list.filter((item) => {
        const result = array.find(({ encodeId }) => encodeId == item);
        return result ? false : true;
      });

      const reduce = array.filter(({ encodeId }) => {
        const result = list.find((item) => item == encodeId);
        return result ? true : false;
      });

      const temp: ZingMP3SongObject[] = [];
      const length = filter.length;
      for (let index = 0; index < length; index++) {
        const id = filter[index];

        const data = await handleFetch<ZingMP3SongResponse>(
          `${externalApi.musicZingMP3}/infoSong/${id}`
        );

        if (!data || data.err != 0) continue;
        temp.push(data.data);
      }

      setArray([...reduce, ...temp]);
    }

    init();
  }, [JSON.stringify(list)]);

  function song(id: string) {
    const url = new URL(location.href);
    url.searchParams.set("id", id);
    router.push(url.href);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <LIcon icon={ListMusic} button />
        </div>
      </SheetTrigger>
      <SheetContent className="p-3 [&>button]:hidden">
        <ScrollArea>
          <ul className="flex flex-col gap-2">
            {array.map((item) => {
              const active = item.encodeId == id;

              return (
                <li
                  key={item.encodeId}
                  className={`px-2 py-1.5 cursor-pointer rounded gap-2 flex justify-between items-center group group/icon dark:text-white/80 ${
                    active
                      ? "bg-black/20 dark:bg-white/20"
                      : " hover:bg-black/20 dark:hover:bg-white/20"
                  }`}
                  onClick={active ? undefined : () => song(item.encodeId)}
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
                      <div className="font-bold text-base line-clamp-1 flex-1">
                        {item.title}
                      </div>
                      <i>{durationUTC(item.duration)}</i>
                    </div>
                    <div className="line-clamp-1">
                      {item.artists?.map(({ name }) => name).join(", ")}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
