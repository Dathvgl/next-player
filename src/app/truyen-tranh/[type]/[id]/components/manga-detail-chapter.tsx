import { externalApi } from "~/lib/api";
import { MangaChapter } from "~/types/manga";
import MangaDetailChapterBody from "./manga-detail-chapter-body";
import handleFetch from "~/lib/fetch";

interface MangaChapterProps {
  type: string;
  id: string;
}

export default async function MangaDetailChapter({
  type,
  id,
}: MangaChapterProps) {
  const data = await handleFetch<MangaChapter[]>(
    `${externalApi.manga}/chapter/${id}?type=${type}`
  );

  if (!data) return <></>;
  return <MangaDetailChapterBody id={id} type={type} data={data} />;
}
