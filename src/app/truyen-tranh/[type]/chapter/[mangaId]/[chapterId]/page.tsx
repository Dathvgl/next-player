import { externalApi } from "~/lib/api";
import { MangaChapterDetail } from "~/types/manga";
import BodyPage from "./components/body-page";

interface PageProps {
  params: {
    type: string;
    mangaId: string;
    chapterId: string;
  };
}

export default async function Page(props: PageProps) {
  const { type, mangaId, chapterId } = props.params;

  const res = await fetch(
    `${externalApi.manga}/chapter/${mangaId}/${chapterId}?type=${type}`
  );

  const data: MangaChapterDetail = await res.json();
  return <BodyPage {...props.params} data={data} />;
}
