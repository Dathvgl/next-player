import { Metadata } from "next";
import { CustomImage } from "~/components/custom-image/custom-image";
import {
  getMangaChapterImage,
  getMangaDetail,
  getMangaUserFollow,
} from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import BodyHandle from "./components/body-handle";
import BodyZoom from "./components/body-zoom";
import StickyBar from "./components/sticky-bar";

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
  const chapter = await getMangaChapterImage({ type, id: detailId, chapterId });
  const followed = await getMangaUserFollow({ type, id: detailId });
  if (!chapter) return null;

  const props = {
    type,
    detailId,
    chapterId,
    data: chapter,
    followed,
  };

  return (
    <article className="select-none">
      <BodyHandle {...props} />
      <StickyBar
        {...chapter}
        type={type}
        detailId={detailId}
        chapterId={chapterId}
        followed={followed}
      />
      <section className="w-full flex justify-center">
        <BodyZoom>
          {chapter.current?.chapters.map((item) => (
            <li key={item._id}>
              <CustomImage src={item.src} alt={item.chapterIndex} />
            </li>
          ))}
        </BodyZoom>
      </section>
    </article>
  );
}
