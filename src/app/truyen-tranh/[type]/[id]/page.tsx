import MangaThumnailServer from "~/app/truyen-tranh/components/manga-thumnail-server";
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
import { MangaFollowContextProvider } from "~/contexts/manga-follow-context";
import { MangaFollowStateContextProvider } from "~/contexts/manga-follow-state-context";
import { externalApi } from "~/lib/api";
import { compactNumber } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { MangaChapter, MangaDetail } from "~/types/manga";
import MangaButton from "./components/manga-button";
import MangaDetailChapter from "./components/manga-detail-chapter";
import { MangaFollow, MangaFollowCeil } from "./components/manga-follow";

interface PageProps {
  params: { type: string; id: string };
}

export async function generateMetadata({ params: { type, id } }: PageProps) {
  const data = await handleFetch<MangaDetail>(
    `${externalApi.manga}/detail/${id}?type=${type}`
  );
  return { title: data?.title, description: data?.description };
}

export default async function Page(props: PageProps) {
  const { type, id } = props.params;

  const detail = await handleFetch<MangaDetail>(
    `${externalApi.manga}/detail/${id}?type=${type}`,
    { next: { revalidate: 60 } }
  );

  const chapters = await handleFetch<MangaChapter[]>(
    `${externalApi.manga}/chapter/${id}?type=${type}`
  );

  if (!detail) return <></>;

  return (
    <MangaFollowStateContextProvider id={id} type={type}>
      <article className="relative">
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
              <MangaFollowContextProvider
                id={detail._id}
                type={type}
                followed={detail.followed}
              >
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
                        <MangaFollowCeil followed={detail.followed} />
                      </TableRow>
                    </TableBody>
                  </Table>
                  <MangaButton type={type} id={id} chapters={chapters} />
                  <MangaFollow />
                </div>
              </MangaFollowContextProvider>
            </div>
          </div>
          <section className="flex gap-4 flex-wrap">
            {detail.tags.map((item) => (
              <Chip key={item._id} text={item.name} />
            ))}
          </section>
          {detail.description && <section>{detail.description}</section>}
          <section>
            <MangaDetailChapter type={type} id={detail._id} data={chapters} />
          </section>
        </section>
      </article>
    </MangaFollowStateContextProvider>
  );
}
