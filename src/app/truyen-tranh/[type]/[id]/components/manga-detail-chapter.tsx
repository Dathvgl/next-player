import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { externalApi } from "~/lib/api";
import { numChapter, timeFromNow } from "~/lib/convert";
import { MangaChapter } from "~/types/manga";

interface MangaChapterProps {
  type: string;
  id: string;
}

export default async function MangaDetailChapter({
  type,
  id,
}: MangaChapterProps) {
  const res = await fetch(`${externalApi.manga}/chapter/${id}?type=${type}`);
  const data: MangaChapter[] = await res.json();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chapter</TableHead>
          <TableHead>Lượt xem</TableHead>
          <TableHead>Thời gian</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <Link href={`/truyen-tranh/${type}/chapter/${id}/${item._id}`}>
                {numChapter(item.chapter, true)}
              </Link>
            </TableCell>
            <TableCell>{0}</TableCell>
            <TableCell>{timeFromNow(item.time)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
