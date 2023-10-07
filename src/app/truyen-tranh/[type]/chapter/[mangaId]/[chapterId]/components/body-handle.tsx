"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";
import { MangaChapterDetail, MangaLocal } from "~/types/manga";

interface BodyHandleProps {
  type: string;
  mangaId: string;
  chapterId: string;
  data: MangaChapterDetail;
}

export default function BodyHandle(props: BodyHandleProps) {
  const { type, mangaId, chapterId, data } = props;
  const { current, chapters } = data;
  const mangaFollowStateContext = useMangaFollowState();

  const [mangaLocal, setMangaLocal] = useLocalStorage<MangaLocal[]>(
    "mangaHistory",
    [
      {
        type: type,
        mangaId: mangaId,
        chapterId: chapterId,
        chapterNum: current?.chapter ?? 0,
        timestamp: 0,
      },
    ]
  );

  useEffect(() => {
    const local: MangaLocal = {
      type: type,
      mangaId: mangaId,
      chapterId: chapterId,
      chapterNum: current?.chapter ?? 0,
      timestamp: 0,
    };

    const result = mangaLocal.find((item) => {
      return item.type == local.type && item.mangaId == local.mangaId;
    });

    if (result) {
      const list = mangaLocal.filter((item) => {
        return item.type != local.type && item.mangaId != local.mangaId;
      });

      setMangaLocal([...list, local]);
    } else {
      setMangaLocal([...mangaLocal, local]);
    }

    async function init() {
      if (!mangaFollowStateContext) return;
      if (!mangaFollowStateContext.stateFollow) {
        await mangaFollowStateContext.getFollow();
      } else {
        if (mangaFollowStateContext.stateFollow.currentChapterId != chapterId) {
          await mangaFollowStateContext.putFollow(
            chapterId,
            chapters.map(({ _id }) => _id)
          );
        }
      }
    }

    init();
  }, [chapterId, mangaFollowStateContext?.stateFollow]);

  return <></>;
}
