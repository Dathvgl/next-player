"use client";

import { useAppSelector } from "~/redux/hook";
import { musicZingMP3IdSelector } from "~/redux/selectors/music-selector";

export default function ZingMP3Empty() {
  const id = useAppSelector(musicZingMP3IdSelector);
  if (!id) return null;
  else return <div className="md:h-24 max-md:h-40" />;
}
