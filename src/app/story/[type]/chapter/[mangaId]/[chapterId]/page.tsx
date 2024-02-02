import { Metadata } from "next";
import { MangaFollowStateContextProvider } from "~/contexts/manga-follow-state-context";
import { getMangaChapterImage, getMangaDetail } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import BodyPage from "./components/body-page";

type PageProps = {
  type: MangaType;
  mangaId: string;
  chapterId: string;
};

export async function generateMetadata({
  params: { type, mangaId, chapterId },
}: ParamReact<PageProps>): Promise<Metadata> {
  const detail = await getMangaDetail({ id: mangaId, type });
  const chapter = await getMangaChapterImage({ type, id: mangaId, chapterId });
  return { title: `${detail?.title} - Chapter ${chapter?.current?.chapter}` };
}

export default async function Page({
  params: { type, mangaId, chapterId },
}: ParamReact<PageProps>) {
  const data = await getMangaChapterImage({ type, id: mangaId, chapterId });
  if (!data) return null;

  return (
    <MangaFollowStateContextProvider id={mangaId} type={type}>
      <BodyPage
        type={type}
        mangaId={mangaId}
        chapterId={chapterId}
        data={data}
      />
    </MangaFollowStateContextProvider>
  );
}
