"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "~/components/ui/use-toast";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { zingMP3Init } from "~/redux/features/music-slice";
import { useAppDispatch } from "~/redux/hook";
import { ZingMP3SongDetailResponse } from "~/types/music/zingMP3/song";
import { ChildReact } from "~/types/type";

export default function ZingMP3Wrapper({ children }: ChildReact) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function init() {
      const data = await handleFetch<ZingMP3SongDetailResponse>(
        `${externalApi.musicZingMP3}/song/${id}`
      );

      if (!data || data.err != 0 || !id) {
        toast({ title: "Zing MP3 Error", description: data?.msg });
      } else {
        const { "128": src } = data.data;
        dispatch(zingMP3Init({ id, src }));
      }
    }

    if (id) init();
  }, [id]);

  return <>{children}</>;
}
