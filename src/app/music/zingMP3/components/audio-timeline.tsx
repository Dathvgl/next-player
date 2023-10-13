"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { durationUTC } from "~/lib/convert";
import { zingMP3Play } from "~/redux/features/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

export default function AudioTimeline() {
  const current = useAppSelector((state) => state.music.zingMP3.current);
  const play = useAppSelector((state) => state.music.zingMP3.play);
  const volume = useAppSelector((state) => state.music.zingMP3.volume);
  const list = useAppSelector((state) => state.music.zingMP3.list);
  const loop = useAppSelector((state) => state.music.zingMP3.loop);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = current.src;
    audioRef.current.load();
  }, [current.src]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!play) audioRef.current.pause();
    else audioRef.current.play();
  }, [play, current.src]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.onloadedmetadata = () => {
      setDuration(() => audioRef.current!.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setTime(() => audioRef.current!.currentTime);
    };
  }, []);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    const range = Number.parseFloat(event.target.value);
    audioRef.current.currentTime = range;
  }

  function onEnded() {
    if (!audioRef.current) return;

    if (loop == "one") {
      dispatch(zingMP3Play(false));
      audioRef.current.currentTime = 0;
      return;
    }

    if (loop == "loop-one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    const result = list.findIndex((item) => item == current.id);
    if (result < 0) return;
    const { length } = list;

    if (loop == "all") {
      if (result != length - 1) {
        const url = new URL(location.href);
        url.searchParams.set("id", list[result + 1]);
        router.push(url.href);
      }

      return;
    }

    if (loop == "loop-all") {
      const url = new URL(location.href);

      if (result != length - 1) {
        url.searchParams.set("id", list[result + 1]);
      } else {
        url.searchParams.set("id", list[0]);
      }

      router.push(url.href);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} onEnded={onEnded}>
        <source src={current.src} type="audio/mp3" />
      </audio>
      <div>{durationUTC(time)}</div>
      <input
        className="w-96"
        type="range"
        value={time}
        min={0}
        max={duration}
        onChange={onChange}
      />
      <div>{durationUTC(duration)}</div>
    </div>
  );
}
