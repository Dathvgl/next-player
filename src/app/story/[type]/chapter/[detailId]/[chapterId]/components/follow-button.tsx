"use client";

import { Heart } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  deleteMangaUserFollow,
  postMangaUserFollow,
} from "~/services/manga-service";
import { MangaFollow, MangaType } from "~/types/manga";

type FollowButtonProps = {
  id: string;
  type: MangaType;
  followed?: MangaFollow | null;
};

export default function FollowButton({
  id,
  type,
  followed,
}: FollowButtonProps) {
  async function onFollow() {
    if (followed) {
      await deleteMangaUserFollow({ id, type });
    } else {
      await postMangaUserFollow({ id, type });
    }
  }

  return (
    <Button
      className={cn(
        "rounded-3xl",
        followed
          ? "[&_svg]:fill-red"
          : "[&_svg]:fill-black dark:[&_svg]:fill-white"
      )}
      variant="outline"
      size="icon"
      onClick={onFollow}
    >
      <LIcon icon={Heart} fill={followed ? "red" : undefined} />
    </Button>
  );
}
