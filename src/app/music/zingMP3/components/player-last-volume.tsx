"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import LIcon from "~/components/lucide-icon";
import { zingMP3Volume } from "~/redux/slices/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

export default function PlayerLastVolume() {
  const volume = useAppSelector((state) => state.music.zingMP3.volume);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = inputRef.current;
    const handleWheel = (event: WheelEvent) => {
      if (inputRef.current) {
        const value = Number.parseInt(inputRef.current.value);
        if (event.deltaY < 0) inputRef.current.value = `${value + 20}`;
        if (event.deltaY > 0) inputRef.current.value = `${value - 20}`;

        const range = Number.parseInt(inputRef.current.value);
        assignVolume(range);
      }
    };

    target?.addEventListener("wheel", handleWheel);

    return () => {
      target?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  function assignVolume(num: number) {
    dispatch(zingMP3Volume(num / 100));
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const range = Number.parseInt(event.target.value);
    assignVolume(range);
  }

  return (
    <div className="flex items-center gap-2">
      {volume ? (
        volume < 0.5 ? (
          <LIcon icon={Volume1} button />
        ) : (
          <LIcon icon={Volume2} button />
        )
      ) : (
        <LIcon icon={VolumeX} button />
      )}

      <input
        ref={inputRef}
        className="w-32"
        type="range"
        min={0}
        max={100}
        onChange={onChange}
        value={volume * 100}
      />
    </div>
  );
}
