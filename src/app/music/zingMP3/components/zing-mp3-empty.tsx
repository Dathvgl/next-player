"use client";

import { useAppSelector } from "~/redux/hook";

export default function ZingMP3Empty() {
  const id = useAppSelector((state) => state.music.zingMP3.current.id);
  if (!id) return <></>;
  else return <div className="h-24" />;
}
