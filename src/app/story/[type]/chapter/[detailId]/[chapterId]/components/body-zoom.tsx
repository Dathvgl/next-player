"use client";

import { MotionUl } from "~/lib/motion";
import { useAppSelector } from "~/redux/hook";
import { mangaZoomSelector } from "~/redux/selectors/manga-selector";
import { ChildReact } from "~/types/type";

export default function BodyZoom({ children }: ChildReact) {
  const zoom = useAppSelector(mangaZoomSelector);
  return <MotionUl animate={{ width: `${zoom}%` }}>{children}</MotionUl>;
}
