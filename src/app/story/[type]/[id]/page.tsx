import { Metadata } from "next";
import MangaThumnailServer from "~/app/story/components/manga-thumnail-server";
import Chip from "~/components/chip";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { compactNumber } from "~/lib/convert";
import { getMangaChapters, getMangaDetail, getMangaUserFollow } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import MangaButton from "./components/manga-button";
import MangaDetailChapter from "./components/manga-detail-chapter";
import MangaFollow from "./components/manga-follow";
import MangaFollowCeil from "./components/manga-follow-ceil";

export async function generateMetadata({
  params: { type, id },
}: ParamReact<{ type: MangaType; id: string }>): Promise<Metadata> {
  const data = await getMangaDetail({ id, type });
  return { title: data?.title, description: data?.description };
}

export default async function Page({
  params: { type, id },
}: ParamReact<{ type: MangaType; id: string }>) {
  const detail = await getMangaDetail({ id, type });
  const chapters = await getMangaChapters({ id, type });
  const followed = await getMangaUserFollow({ id, type });

  if (!detail) return null;

  return (
    <section className="relative">
      <section className="w-full absolute blur-[6px] z-0">
        <MangaThumnailServer
          className="w-full h-[200px]"
          fill
          type={type}
          id={id}
          title={detail.title}
        />
      </section>
      <section className="px-10 py-10 relative z-20 flex flex-col gap-4">
        <div className="flex max-md:flex-col gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="md:w-[40%] rounded-lg overflow-hidden group relative">
                <div className="absolute hidden w-full h-full group-hover:block group-hover:bg-black group-hover:bg-opacity-30" />
                <MangaThumnailServer
                  className="rounded-lg overflow-hidden"
                  type={type}
                  id={id}
                  title={detail.title}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="p-0 [&>button]:hidden">
              <MangaThumnailServer type={type} id={id} title={detail.title} />
            </DialogContent>
          </Dialog>
          <div className="flex-1 flex flex-col gap-2">
            <b className="text-3xl line-clamp-2 text-white md:h-[160px]">
              {detail.title}
            </b>
            <div className="pt-2 flex flex-col gap-4">
              {detail.altTitle && <div>Tên khác: {detail.altTitle}</div>}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Các lượt</TableHead>
                    <TableHead>Số người</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Lượt xem</TableCell>
                    <TableCell>{compactNumber(detail.watched)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lượt theo dõi</TableCell>
                    <MangaFollowCeil
                      id={id}
                      type={type}
                      followed={detail.followed}
                    />
                  </TableRow>
                </TableBody>
              </Table>
              <MangaButton id={id} type={type} chapters={chapters} />
              <MangaFollow id={id} type={type} followed={followed} />
            </div>
          </div>
        </div>
        <section className="flex gap-4 flex-wrap">
          {detail.tags.map((item) => (
            <Chip key={item._id} text={item.name} />
          ))}
        </section>
        {detail.description && <section>{detail.description}</section>}
        <MangaDetailChapter id={detail._id} type={type} chapters={chapters} />
      </section>
    </section>
  );
}
