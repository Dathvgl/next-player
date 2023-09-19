"use client";

import { ChangeEvent, RefObject, useEffect, useState } from "react";
import { useZingMP3, useZingMP3Dispatch } from "~/contexts/zing-mp3-context";
import { durationUTC } from "~/lib/convert";

export default function AudioTimeline(props: {
  audioRef: RefObject<HTMLAudioElement>;
}) {
  const { audioRef } = props;
  const musicContext = useZingMP3();
  const musicDispatch = useZingMP3Dispatch();

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.onloadedmetadata = () => {
      setDuration(() => audioRef.current!.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setTime(() => audioRef.current!.currentTime);
    };

    audioRef.current.onended = () => {
      musicDispatch?.({ type: "played", payload: { played: false } });
      audioRef.current!.currentTime = 0;
    };
  }, [musicContext?.id]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    const range = Number.parseFloat(event.target.value);
    audioRef.current.currentTime = range;
  }
  return (
    <div className="flex items-center gap-4">
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
