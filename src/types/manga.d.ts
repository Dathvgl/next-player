import { FetchList } from "./type";

export type MangaType = "nettruyen" | "blogtruyen";
export type MangaSort = "lastest" | "chapter" | "name";
export type MangaOrder = "asc" | "desc";

export type MangaLocal = {
  type: string;
  mangaId: string;
  chapterId: string;
  chapterNum: number;
  timestamp: number;
};

export type MangaList = FetchList<
  Omit<MangaDetail, "altTitle"> & {
    chapters: { _id: string; chapter: number; time: number }[];
  }
>;

export type MangaListAdmin = FetchList<MangaDetailAdmin>;

export type MangaThumnail = {
  _id: string;
  detailId: string;
  src: string;
};

export type MangaDetail = {
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
};

export type MangaDetailAdmin = Omit<
  MangaDetail,
  "altTitle" | "description" | "authors"
> & { href: string };

export type MangaChapter = {
  _id: string;
  detailId: string;
  chapter: number;
  watched: number;
  time: number;
};

export type MangaChapterDetail = {
  canPrev: { _id: string; chapter: number } | null;
  canNext: { _id: string; chapter: number } | null;
  current: {
    _id: string;
    chapter: number;
    chapters: MangaChapterImage[];
  } | null;
  chapters: { _id: string; chapter: number }[];
};

export type MangaChapterImage = {
  _id: string;
  chapterId: string;
  chapterIndex: string;
  src: string;
};

export type MangaTag = {
  _id: string;
  name: string;
  description: string;
};
