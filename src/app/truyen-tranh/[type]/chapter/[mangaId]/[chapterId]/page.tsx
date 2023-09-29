import { MangaFollowStateContextProvider } from "~/contexts/manga-follow-state";
import { externalApi } from "~/lib/api";
import { MangaChapterDetail } from "~/types/manga";
import BodyPage from "./components/body-page";
import handleFetch from "~/lib/fetch";

interface PageProps {
  params: {
    type: string;
    mangaId: string;
    chapterId: string;
  };
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
