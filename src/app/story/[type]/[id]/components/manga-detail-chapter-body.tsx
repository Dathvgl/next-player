"use client";

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
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";
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
        {data
          .sort((a, b) => b.chapter - a.chapter)
          .map((item) => {
            const check =
              stateFollow?.lastestChapterId == item._id
                ? "red"
                : stateFollow?.currentChapterId == item._id
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
  );
}
