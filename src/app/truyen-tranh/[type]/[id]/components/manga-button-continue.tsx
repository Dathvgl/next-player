"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";

interface MangaButtonContinueProps {
  id: string;
  type: string;
  chapters?: string[];
}

export default function MangaButtonContinue(props: MangaButtonContinueProps) {
  const { type, id, chapters } = props;
  const stateFollow = useMangaFollowState()?.stateFollow;

  if (!stateFollow || !chapters) return <></>;
  const result = chapters.find((item) => item == stateFollow.currentChapterId);
  if (!result) return <></>;

  return (
    <Link href={`/truyen-tranh/${type}/chapter/${id}/${result}`}>
      <Button className="flex-1">Đọc tiếp</Button>
    </Link>
  );
}
