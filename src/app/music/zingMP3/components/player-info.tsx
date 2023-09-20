"use client";

import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import { useZingMP3 } from "~/contexts/zing-mp3-context";
import { ZingMP3SongResponse } from "~/types/music/zingMP3/song";

export default function PlayerInfo() {
  const musicContext = useZingMP3();
  const [data, setData] = useState<ZingMP3SongResponse>();

  useEffect(() => {
    async function init() {
      if (musicContext?.id) {
        const res = await fetch(
          `${location.origin}/api/music/zingMP3/infoSong/${musicContext.id}`
        );
        setData(await res.json());
      }
    }

    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, [musicContext?.id]);

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
