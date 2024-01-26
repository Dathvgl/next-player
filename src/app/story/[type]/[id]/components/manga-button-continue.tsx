"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { site } from "~/configs/site";
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";

interface MangaButtonContinueProps {
  id: string;
  type: string;
  chapters?: string[];
}

export default function MangaButtonContinue(props: MangaButtonContinueProps) {
  const { type, id, chapters } = props;
  const stateFollow = useMangaFollowState()?.stateFollow;

  if (!stateFollow || !chapters) return null;
  const result = chapters.find((item) => item == stateFollow.currentChapterId);
  if (!result) return null;

  return (
    <Link
      href={`${site.story}/${type}/chapter/${id}/${result}`}
      className="flex-1"
    >
      <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
        Đọc tiếp
      </Button>
    </Link>
  );
}
