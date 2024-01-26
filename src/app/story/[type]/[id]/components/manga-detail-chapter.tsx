import { MangaChapter } from "~/types/manga";
import MangaDetailChapterBody from "./manga-detail-chapter-body";

interface MangaChapterProps {
  type: string;
  id: string;
  data?: MangaChapter[];
}

export default async function MangaDetailChapter({
  type,
  id,
  data,
}: MangaChapterProps) {
  if (!data) return null;
  return <MangaDetailChapterBody id={id} type={type} data={data} />;
}
