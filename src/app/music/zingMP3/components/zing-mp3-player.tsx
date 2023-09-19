"use client";

import { useZingMP3 } from "~/contexts/zing-mp3-context";
import PlayerAudio from "./player-audio";
import PlayerInfo from "./player-info";
import PlayerVolume from "./player-volume";

export default function ZingMP3Player() {
  const musicContext = useZingMP3();
  if (!musicContext || !musicContext.id || !musicContext.src) return <></>;
  return <ZingMP3PlayerControls src={musicContext.src} />;
}

function ZingMP3PlayerControls({ src }: { src: string }) {
  return (
    <div className="w-full px-4 py-2 absolute bottom-0 flex items-center h-24 gap-4 bg-white dark:bg-black z-[3000]">
      <PlayerInfo />
      <PlayerAudio src={src} />
      <PlayerVolume />
    </div>
  );
}
