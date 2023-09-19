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
import { useZingMP3, useZingMP3Dispatch } from "~/contexts/zing-mp3-context";
import AudioTimeline from "./audio-timeline";

export default function PlayerAudio({ src }: { src: string }) {
  const musicContext = useZingMP3();
  const musicDispatch = useZingMP3Dispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.load();
  }, [src]);

  useEffect(() => {
    if (!audioRef.current || musicContext?.played == undefined) return;

    if (!musicContext.played) {
      audioRef.current.pause();
    } else audioRef.current.play();
  }, [musicContext?.played]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = musicContext?.volume ?? 0;
  }, [musicContext?.volume]);

  function play() {
    if (!musicContext) return;
    if (!audioRef.current || !musicContext?.src) return;

    if (musicContext.played == undefined) {
      musicDispatch?.({ type: "played", payload: { played: true } });
    } else {
      musicDispatch?.({
        type: "played",
        payload: { played: !musicContext.played },
      });
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <audio ref={audioRef}>
        <source src={musicContext?.src} type="audio/mp3" />
      </audio>
      <div className="flex items-center">
        <button>
          <LIcon icon={Shuffle} button />
        </button>
        <button>
          <LIcon icon={SkipBack} button />
        </button>
        {musicContext?.src !== undefined && (
          <button onClick={play}>
            {musicContext?.played ? (
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
