import { Star } from "lucide-react";
import Link from "next/link";
import LIcon from "~/components/lucide-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { site } from "~/configs/site";
import { numChapter, timeFromNow } from "~/lib/convert";
import { getMangaUserFollow } from "~/services/manga-service";
import { MangaChapter, MangaType } from "~/types/manga";

type MangaChapterProps = {
  id: string;
  type: MangaType;
  chapters?: MangaChapter[];
};

export default async function MangaDetailChapter({
  type,
  id,
  chapters,
}: MangaChapterProps) {
  const data = await getMangaUserFollow({ id, type });
  if (!chapters) return null;

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chapter</TableHead>
            <TableHead>Lượt xem</TableHead>
            <TableHead>Thời gian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters
            .sort((a, b) => b.chapter - a.chapter)
            .map((item) => {
              const check =
                data?.lastestChapterId == item._id
                  ? "red"
                  : data?.currentChapterId == item._id
                  ? "yellow"
                  : undefined;

              return (
                <TableRow key={item._id}>
                  <TableCell
                    className={!check ? undefined : "flex items-center gap-2"}
                  >
                    <Link
                      href={`${site.story}/${type}/chapter/${id}/${item._id}`}
                    >
                      {numChapter(item.chapter, true)}
                    </Link>
                    {check && <LIcon icon={Star} color={check} fill={check} />}
                  </TableCell>
                  <TableCell>{item.watched}</TableCell>
                  <TableCell>{timeFromNow(item.time)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
}
