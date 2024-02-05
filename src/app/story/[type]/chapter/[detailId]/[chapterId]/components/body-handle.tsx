"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useBreakPoint } from "~/components/break-point";
import { useAppDispatch } from "~/redux/hook";
import { mangaZoom } from "~/redux/slices/manga-slice";
import { putMangaUserFollow } from "~/services/manga-service";
import {
  MangaChapterDetail,
  MangaFollow,
  MangaLocal,
  MangaType,
} from "~/types/manga";

type BodyHandleProps = {
  type: MangaType;
  detailId: string;
  chapterId: string;
  data: MangaChapterDetail;
  followed?: MangaFollow | null;
};

export default function BodyHandle({
  type,
  detailId,
  chapterId,
  data,
  followed,
}: BodyHandleProps) {
  const { current, chapters } = data;

  const dispatch = useAppDispatch();

  const [mangaLocal, setMangaLocal] = useLocalStorage<MangaLocal[]>(
    "mangaHistory",
    [
      {
        type: type,
        detailId: detailId,
        chapterId: chapterId,
        chapterNum: current?.chapter ?? 0,
        timestamp: 0,
      },
    ]
  );

  const { sm } = useBreakPoint(["sm"]);

  useEffect(() => {
    if (sm) {
      dispatch(mangaZoom(100));
    } else {
      dispatch(mangaZoom(50));
    }
  }, [sm]);

  useEffect(() => {
    const local: MangaLocal = {
      type,
      detailId,
      chapterId,
      chapterNum: current?.chapter ?? 0,
      timestamp: 0,
    };

    const result = mangaLocal.find((item) => {
      return item.type == local.type && item.detailId == local.detailId;
    });

    if (result) {
      const list = mangaLocal.filter((item) => {
        return item.type != local.type && item.detailId != local.detailId;
      });

      setMangaLocal([...list, local]);
    } else {
      setMangaLocal([...mangaLocal, local]);
    }

    async function init() {
      if (followed && followed.currentChapterId != chapterId) {
        await putMangaUserFollow({
          id: detailId,
          type,
          replace: chapters
            .map(({ _id }) => _id)
            .includes(followed.lastestChapterId)
            ? followed.lastestChapterId == chapterId
            : true,
          chapter: chapterId,
        });
      }
    }

    init();
  }, [chapterId, followed]);

  return null;
}
