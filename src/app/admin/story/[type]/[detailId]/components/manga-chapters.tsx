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
import { site, siteAdmin } from "~/configs/site";
import { numChapter, timeFromNow } from "~/lib/convert";
import { getMangaChapters } from "~/services/manga-service";
import { MangaType } from "~/types/manga";

type MangaChaptersProps = {
  type: MangaType;
  id: string;
};

export default async function MangaChapters({ id, type }: MangaChaptersProps) {
  const chapters = await getMangaChapters({ id, type });
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
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link
                    href={`${siteAdmin.story}/${type}/${id}/${item._id}`}
                  >
                    {numChapter(item.chapter, true)}
                  </Link>
                </TableCell>
                <TableCell>{item.watched}</TableCell>
                <TableCell>{timeFromNow(item.time)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}
