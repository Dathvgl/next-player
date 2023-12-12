import { Metadata } from "next";
import { MangaFollowStateContextProvider } from "~/contexts/manga-follow-state-context";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { MangaChapterDetail, MangaDetail } from "~/types/manga";
import BodyPage from "./components/body-page";

interface PageProps {
  params: {
    type: string;
    mangaId: string;
    chapterId: string;
  };
}

export async function generateMetadata({
  params: { type, mangaId, chapterId },
}: PageProps): Promise<Metadata> {
  const detail = await handleFetch<MangaDetail>(
    `${externalApi.manga}/detail/${mangaId}?type=${type}`
  );

  const chapter = await handleFetch<MangaChapterDetail>(
    `${externalApi.manga}/chapter/${mangaId}/${chapterId}?type=${type}`
  );

  return { title: `${detail?.title} - Chapter ${chapter?.current?.chapter}` };
}

export default async function Page(props: PageProps) {
  const { type, mangaId, chapterId } = props.params;

  const data = await handleFetch<MangaChapterDetail>(
    `${externalApi.manga}/chapter/${mangaId}/${chapterId}?type=${type}`
  );

  if (!data) return <></>;

  return (
    <MangaFollowStateContextProvider id={mangaId} type={type}>
      <BodyPage {...props.params} data={data} />;
    </MangaFollowStateContextProvider>
  );
}
