"use client";

import { useAppSelector } from "~/redux/hook";
import PlayerAudio from "./player-audio";
import PlayerInfo from "./player-info";
import PlayerLast from "./player-last";
import useGridBreak from "~/hooks/use-grid-break";

export default function ZingMP3Player() {
  const src = useAppSelector((state) => state.music.zingMP3.current.src);
  if (!src) return null;
  return <ZingMP3PlayerControls />;
}

function ZingMP3PlayerControls() {
  const gridBreak = useGridBreak(["xs", "lg", "xl"]);

  return (
    <div className="w-full px-4 py-2 absolute bottom-0 flex max-md:flex-col items-center md:h-24 max-md:h-40 md:gap-4 bg-white dark:bg-black z-[16]">
      <div className="flex max-md:gap-4 max-md:justify-between max-md:w-full lg:basis-1/4">
        <PlayerInfo />
        {gridBreak != "md" && <PlayerLast />}
      </div>
      <PlayerAudio />
      {gridBreak == "md" && <PlayerLast />}
    </div>
  );
}
