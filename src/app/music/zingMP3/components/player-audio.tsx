"use client";

import {
  PauseCircle,
  PlayCircle,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useEffect, useRef } from "react";
import LIcon from "~/components/lucide-icon";
import { zingMP3Play } from "~/redux/features/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import AudioTimeline from "./audio-timeline";

export default function PlayerAudio() {
  const src = useAppSelector((state) => state.music.zingMP3.src);
  const play = useAppSelector((state) => state.music.zingMP3.play);
  const volume = useAppSelector((state) => state.music.zingMP3.volume);

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.load();
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!play) audioRef.current.pause();
    else audioRef.current.play();
  }, [play]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  function playHandle() {
    if (!audioRef.current || !src) return;
    dispatch(zingMP3Play(!play));
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <audio ref={audioRef}>
        <source src={src} type="audio/mp3" />
      </audio>
      <div className="flex items-center">
        <button>
          <LIcon icon={Shuffle} button />
        </button>
        <button>
          <LIcon icon={SkipBack} button />
        </button>
        {src && (
          <button onClick={playHandle}>
            {play ? (
              <LIcon icon={PauseCircle} button size={30} />
            ) : (
              <LIcon icon={PlayCircle} button size={30} />
            )}
          </button>
        )}
        <button>
          <LIcon icon={SkipForward} button />
        </button>
        <button>
          <LIcon icon={Repeat} button />
        </button>
      </div>
      <AudioTimeline audioRef={audioRef} />
    </div>
  );
}
