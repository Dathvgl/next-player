"use client";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  deleteMangaUserFollow,
  postMangaUserFollow,
} from "~/services/manga-service";
import { MangaFollow, MangaType } from "~/types/manga";

type MangaFollowProps = {
  id: string;
  type: MangaType;
  followed?: MangaFollow | null;
};

export default function MangaFollow({ id, type, followed }: MangaFollowProps) {
  async function onClick() {
    if (followed) {
      await deleteMangaUserFollow({ id, type });
    } else {
      await postMangaUserFollow({ id, type });
    }
  }

  return (
    <Button
      className={cn(
        "text-white hover:text-white",
        followed
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      )}
      onClick={onClick}
    >
      {followed ? "Hủy theo dõi" : "Theo dõi"}
    </Button>
  );
}
