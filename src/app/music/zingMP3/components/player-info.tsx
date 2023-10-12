"use client";

import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { useAppSelector } from "~/redux/hook";
import { ZingMP3SongResponse } from "~/types/music/zingMP3/song";

export default function PlayerInfo() {
  const id = useAppSelector((state) => state.music.zingMP3.id);
  const [data, setData] = useState<ZingMP3SongResponse>();

  useEffect(() => {
    async function init() {
      if (id) {
        const data = await handleFetch<ZingMP3SongResponse>(
          `${externalApi.musicZingMP3}/infoSong/${id}`
        );

        setData(data);
      }
    }

    init();
  }, [id]);

  if (!data) return <></>;
  const song = data.data;

  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 rounded overflow-hidden">
        <CustomImage className="h-full" src={song.thumbnail} alt={song.title} />
      </div>
      <div className="font-bold text-base">{song.title}</div>
    </div>
  );
}
