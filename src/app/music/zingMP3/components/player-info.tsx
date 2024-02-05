"use client";

import { CustomImage } from "~/components/custom-image/custom-image";
import { useAppSelector } from "~/redux/hook";
import { musicZingMP3InfoSelector } from "~/redux/selectors/music-selector";

export default function PlayerInfo() {
  const info = useAppSelector(musicZingMP3InfoSelector);
  if (!info) return null;

  return (
    <div className="flex items-center gap-2 lg:flex-1">
      <div className="w-12 h-12 rounded overflow-hidden">
        <CustomImage src={info.thumbnail} alt={info.title} />
      </div>
      <div className="font-bold text-base line-clamp-2 flex-1">
        {info.title}
      </div>
    </div>
  );
}
