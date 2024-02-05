"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";
import LIcon from "~/components/lucide-icon";
import { timeFromNow } from "~/lib/convert";
import { ZingMP3ReleaseSection } from "~/types/music/zingMP3/release";

type FilterType = "all" | "vPop" | "others";

export default function ZingMP3NewRelease(props: {
  data?: ZingMP3ReleaseSection;
}) {
  const { data } = props;
  if (!data) return null;
  else return <ZingMP3NewReleaseItem data={data} />;
}

function ZingMP3NewReleaseItem({ data }: { data: unknown }) {
  const { title, items } = data as ZingMP3ReleaseSection;
  const [filter, setFilter] = useState<FilterType>("all");
  const router = useRouter();

  function onFilter(str: FilterType) {
    setFilter(() => str);
  }

  function song(id: string) {
    const url = new URL(location.href);
    url.searchParams.set("id", id);
    router.push(url.href);
  }

  return (
    <div className="mt-9">
      <div className="font-bold text-2xl">{title}</div>
      <br />
      <div className="flex justify-between items-center text-xs font-semibold">
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-3xl border ${
              filter == "all" && "bg-blue-500"
            }`}
            onClick={() => onFilter("all")}
          >
            TẤT CẢ
          </button>
          <button
            className={`px-6 py-2 rounded-3xl border ${
              filter == "vPop" && "bg-blue-500"
            }`}
            onClick={() => onFilter("vPop")}
          >
            VIỆT NAM
          </button>
          <button
            className={`px-6 py-2 rounded-3xl border ${
              filter == "others" && "bg-blue-500"
            }`}
            onClick={() => onFilter("others")}
          >
            QUỐC TẾ
          </button>
        </div>
        <div className="flex items-center hover:text-blue-500">
          <div className="pr-1">TẤT CẢ</div>
          <LIcon icon={ChevronRight} />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4">
        {items[filter].slice(0, 12).map((item, index) => (
          <div
            key={index}
            className="px-2 py-1 gap-2 flex justify-between items-center hover:bg-black hover:bg-opacity-20 rounded-md  group group/icon"
          >
            <button
              className="w-12 h-12 rounded overflow-hidden"
              onClick={() => song(item.encodeId)}
            >
              <CustomImage
                className="h-full"
                src={item.thumbnail}
                alt={item.title}
              />
            </button>
            <div className="text-sm flex-1">
              <div className="font-bold line-clamp-1">{item.title}</div>
              <div className="line-clamp-1">
                {item.artists.map(({ name }) => name).join(", ")}
              </div>
              <div>{timeFromNow(item.releaseDate)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
