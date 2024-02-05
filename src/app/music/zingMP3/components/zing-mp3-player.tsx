"use client";

import { useAppSelector } from "~/redux/hook";
import { musicZingMP3SrcSelector } from "~/redux/selectors/music-selector";
import { ChildReact } from "~/types/type";

export default function ZingMP3Player({ children }: ChildReact) {
  const src = useAppSelector(musicZingMP3SrcSelector);
  if (!src) return null;
  return children;
}
