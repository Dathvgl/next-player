"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { zingMP3Init } from "~/redux/slices/music-slice";
import { useAppDispatch } from "~/redux/hook";
import { ChildReact } from "~/types/type";

export default function ZingMP3Wrapper({ children }: ChildReact) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) dispatch(zingMP3Init(id));
  }, [id]);

  return <>{children}</>;
}
