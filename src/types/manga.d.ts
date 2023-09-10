import { FetchList } from "./type";

export interface MangaLocal {
  type: string;
  mangaId: string;
  chapterId: string;
  chapterNum: number;
  timestamp: number;
}

export interface MangaList
  extends FetchList<
    Omit<MangaDetail, "altTitle"> & {
      chapters: { _id: string; chapter: number; time: number }[];
    }
  > {}

export interface MangaThumnail {
  _id: string;
  detailId: string;
  src: string;
}

export interface MangaDetail {
  _id: string;
  title: string;
  altTitle?: string;
  authors: { _id: string; name: string }[];
  tags: { _id: string; name: string; description: string }[];
  status: string;
  watched: number;
  followed: number;
  description: string;
  lastestUpdated: number;
}

export interface MangaChapter {
  _id: string;
  detailId: string;
  chapter: number;
  watched: number;
  time: number;
}

export type MangaChapterDetail = {
  canPrev: { _id: string; chapter: number } | null;
  canNext: { _id: string; chapter: number } | null;
  current: {
    _id: string;
    chapter: number;
    chapters: {
      _id: string;
      chapterId: string;
      chapterIndex: string;
      src: string;
    }[];
  } | null;
  chapters: { _id: string; chapter: number }[];
};
