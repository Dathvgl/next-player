"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useMangaFollowState } from "~/contexts/manga-follow-state";
import { numChapter, timeFromNow } from "~/lib/convert";
import { MangaChapter } from "~/types/manga";

interface MangaDetailChapterBodyProps {
  id: string;
  type: string;
  data: MangaChapter[];
}

export default function MangaDetailChapterBody({
  id,
  type,
  data,
}: MangaDetailChapterBodyProps) {
  const stateFollow = useMangaFollowState()?.stateFollow;

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
            <TableCell
              style={{
                color:
                  stateFollow?.lastestChapterId == item._id
                    ? "red"
                    : stateFollow?.currentChapterId == item._id
                    ? "yellow"
                    : undefined,
              }}
            >
              <Link href={`/truyen-tranh/${type}/chapter/${id}/${item._id}`}>
                {numChapter(item.chapter, true)}
              </Link>
            </TableCell>
            <TableCell>{item.watched}</TableCell>
            <TableCell>{timeFromNow(item.time)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
