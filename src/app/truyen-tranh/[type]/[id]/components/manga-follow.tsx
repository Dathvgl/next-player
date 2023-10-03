"use client";

import { Button } from "~/components/ui/button";
import { TableCell } from "~/components/ui/table";
import { useMangaFollow } from "~/contexts/manga-follow-context";
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";
import { compactNumber } from "~/lib/convert";

export function MangaFollow() {
  const mangaFollowContext = useMangaFollow();
  const mangaFollowStateContext = useMangaFollowState();

  const isFollow = mangaFollowStateContext?.stateFollow ? true : false;

  async function onClick() {
    if (!mangaFollowContext || !mangaFollowStateContext) return;

    if (isFollow) {
      await mangaFollowStateContext.deleteFollow();
    } else {
      await mangaFollowStateContext.postFollow();
    }

    await mangaFollowContext.altFollow();
  }

  return (
    <Button onClick={onClick}>{isFollow ? "Hủy theo dõi" : "Theo dõi"}</Button>
  );
}

export function MangaFollowCeil({ followed }: { followed: number }) {
  const newFollowed = useMangaFollow()?.followed;
  return <TableCell>{compactNumber(newFollowed ?? followed)}</TableCell>;
}
