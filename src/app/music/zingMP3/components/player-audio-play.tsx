"use client";

import { PauseCircle, PlayCircle } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { musicZingMP3PlaySelector } from "~/redux/selectors/music-selector";
import { zingMP3Play } from "~/redux/slices/music-slice";

export default function PlayerAudioPlay() {
  const play = useAppSelector(musicZingMP3PlaySelector);
  const dispatch = useAppDispatch();

  function playHandle() {
    dispatch(zingMP3Play(!play));
  }

  return (
    <button onClick={playHandle}>
      {play ? (
        <LIcon icon={PauseCircle} button size={30} />
      ) : (
        <LIcon icon={PlayCircle} button size={30} />
      )}
    </button>
  );
}
