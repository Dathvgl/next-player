import { ListMusic, MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { externalApi } from "~/lib/api";
import { durationUTC } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { MotionDiv, MotionLi } from "~/lib/motion";
import { zingMP3Alt } from "~/redux/features/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import {
  ZingMP3SongObject,
  ZingMP3SongResponse,
} from "~/types/music/zingMP3/song";

export default function PlayerLastList() {
  const router = useRouter();

  const id = useAppSelector((state) => state.music.zingMP3.current.id);
  const list = useAppSelector((state) => state.music.zingMP3.list);

  const dispatch = useAppDispatch();
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

  function onRemove(altId: string) {
    if (altId == id) {
      const index = list.indexOf(altId);
      if (index == -1) return;

      if (index == list.length - 1) {
        if (index - 1 == -1) {
          router.push(location.origin + location.pathname);
        } else {
          const url = new URL(location.href);
          url.searchParams.set("id", list[index - 1]);
          router.push(url.href);
        }
      } else {
        const url = new URL(location.href);
        url.searchParams.set("id", list[index + 1]);
        router.push(url.href);
      }
    }

    dispatch(zingMP3Alt(altId));
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
                <MotionLi
                  key={item.encodeId}
                  initial="init"
                  whileHover="hover"
                  className={`px-2 py-1.5 relative cursor-pointer overflow-hidden rounded gap-2 flex justify-between items-center group group/icon dark:text-white/80 ${
                    active
                      ? "bg-black/20 dark:bg-white/20"
                      : " hover:bg-black/20 dark:hover:bg-white/20"
                  }`}
                  onClick={
                    active
                      ? undefined
                      : () => {
                          song(item.encodeId);
                        }
                  }
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
                      <b className="text-base line-clamp-1 flex-1">
                        {item.title}
                      </b>
                      <i>{durationUTC(item.duration)}</i>
                    </div>
                    <span className="line-clamp-1">
                      {item.artists?.map(({ name }) => name).join(", ")}
                    </span>
                  </div>
                  <MotionDiv
                    className="absolute top-0 right-0 h-full flex flex-col z-[1]"
                    variants={{
                      init: { opacity: 0, x: 20 },
                      hover: { opacity: 1, x: 0 },
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button className="flex-1 bg-stone-500 dark:bg-stone-800 w-[30px] flex items-center justify-center">
                      <LIcon icon={MoreHorizontal} />
                    </button>
                    <button
                      className="flex-1 bg-red-500 w-[30px] flex items-center justify-center"
                      onClick={() => {
                        onRemove(item.encodeId);
                      }}
                    >
                      <LIcon icon={X} color="black" />
                    </button>
                  </MotionDiv>
                </MotionLi>
              );
            })}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
