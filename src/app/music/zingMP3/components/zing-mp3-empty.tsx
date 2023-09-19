"use client";

import { useZingMP3 } from "~/contexts/zing-mp3-context";

export default function ZingMP3Empty() {
  const musicContext = useZingMP3();
  if (!musicContext?.id) return <></>;
  else return <div className="h-24" />;
}
