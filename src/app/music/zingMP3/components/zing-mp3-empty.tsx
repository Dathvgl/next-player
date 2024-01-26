"use client";

import { useAppSelector } from "~/redux/hook";

export default function ZingMP3Empty() {
  const id = useAppSelector((state) => state.music.zingMP3.current.id);
  if (!id) return null;
  else return <div className="md:h-24 max-md:h-40" />;
}
