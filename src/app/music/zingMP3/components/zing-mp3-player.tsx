"use client";

import { useAppSelector } from "~/redux/hook";
import PlayerAudio from "./player-audio";
import PlayerInfo from "./player-info";
import PlayerLast from "./player-last";

export default function ZingMP3Player() {
  const src = useAppSelector((state) => state.music.zingMP3.current.src);
  if (!src) return <></>;
  return <ZingMP3PlayerControls />;
}

function ZingMP3PlayerControls() {
  return (
    <div className="w-full px-4 py-2 absolute bottom-0 flex items-center h-24 gap-4 bg-white dark:bg-black z-[3000]">
      <PlayerInfo />
      <PlayerAudio />
      <PlayerLast />
    </div>
  );
}
