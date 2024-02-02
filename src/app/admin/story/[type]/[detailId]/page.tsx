import { Trash2 } from "lucide-react";
import { Metadata } from "next";
import MangaThumnailServer from "~/app/story/components/manga-thumnail-server";
import Chip from "~/components/chip";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { compactNumber, timeFromNow } from "~/lib/convert";
import { getMangaDetail, getMangaThumnail } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import DialogForm from "./components/dialog-form";
import MangaChapters from "./components/manga-chapters";

export async function generateMetadata({
  params: { type, detailId },
}: ParamReact<{ type: MangaType; detailId: string }>): Promise<Metadata> {
  const data = await getMangaDetail({ id: detailId, type });
  return { title: data?.title, description: data?.description };
}

export default async function Page({
  params: { type, detailId },
}: ParamReact<{ type: MangaType; detailId: string }>) {
  const detail = await getMangaDetail({ id: detailId, type });
  const thumnail = await getMangaThumnail({ id: detailId, type });

  if (!detail || !thumnail) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DialogForm type={type} data={{ ...detail, src: thumnail.src }} />
        <Button variant="destructive">
          <Trash2 className="mr-2 w-4 h-4" /> Xóa truyện
        </Button>
      </div>
      <h3 className="text-center font-bold">
        Cập nhật: {timeFromNow(detail.lastestUpdated)}
      </h3>
      <section className="flex md:items-center max-md:flex-col gap-4">
        <Dialog>
          <DialogTrigger>
            <MangaThumnailServer
              className="rounded-lg overflow-hidden max-h-60"
              hover
              type={type}
              id={detailId}
              title={detail.title}
            />
          </DialogTrigger>
          <DialogContent className="p-0 [&>button]:hidden">
            <MangaThumnailServer
              type={type}
              id={detailId}
              title={detail.title}
            />
          </DialogContent>
        </Dialog>
        <div className="flex-1 flex flex-col gap-1 h-60">
          <b className="text-2xl line-clamp-2 text-white">{detail.title}</b>
          {detail.altTitle && <div>Tên khác: {detail.altTitle}</div>}
          {detail.description && (
            <ScrollArea className="flex-1">
              <p>{detail.description}</p>
            </ScrollArea>
          )}
        </div>
      </section>
      {detail.authors.length != 0 && (
        <ul className="flex gap-2">
          Tác giả:
          {detail.authors.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      )}
      <section className="flex gap-4">
        <Table className="w-1/2">
          <TableHeader>
            <TableRow>
              <TableHead>Thông tin</TableHead>
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
              <TableCell>{compactNumber(detail.followed)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex-1">
          <div className="flex gap-4 flex-wrap">
            {detail.tags.map((item) => (
              <Chip key={item._id} text={item.name} />
            ))}
          </div>
        </div>
      </section>
      <MangaChapters type={type} id={detailId} />
    </section>
  );
}
