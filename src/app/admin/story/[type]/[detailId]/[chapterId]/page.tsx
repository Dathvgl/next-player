import { Metadata } from "next";
import { getMangaChapterImage, getMangaDetail } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import ListData from "./components/list-data";

type PageProps = {
  type: MangaType;
  detailId: string;
  chapterId: string;
};

export async function generateMetadata({
  params: { type, detailId, chapterId },
}: ParamReact<PageProps>): Promise<Metadata> {
  const detail = await getMangaDetail({ id: detailId, type });
  const chapter = await getMangaChapterImage({ type, id: detailId, chapterId });
  return { title: `${detail?.title} - Chapter ${chapter?.current?.chapter}` };
}

export default async function Page({
  params: { type, detailId, chapterId },
}: ParamReact<PageProps>) {
  const data = await getMangaChapterImage({ type, id: detailId, chapterId });
  if (!data || !data.current?.chapters) return null;

  return (
    <ListData
      type={type}
      detailId={detailId}
      chapterId={chapterId}
      data={data.current.chapters}
    />
  );
}
