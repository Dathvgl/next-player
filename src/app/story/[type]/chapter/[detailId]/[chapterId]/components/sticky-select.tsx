"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { site } from "~/configs/site";
import { numChapter } from "~/lib/convert";
import { MangaType } from "~/types/manga";

type StickySelectProps = {
  type: MangaType;
  detailId: string;
  chapterId: string;
  chapters: {
    _id: string;
    chapter: number;
  }[];
};

export default function StickySelect({
  type,
  detailId,
  chapterId,
  chapters,
}: StickySelectProps) {
  const router = useRouter();

  function onSelect(selected: string) {
    if (selected != chapterId) {
      router.push(`${site.story}/${type}/chapter/${detailId}/${selected}`);
    }
  }

  return (
    <Select value={chapterId} onValueChange={onSelect}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Chọn chapter" />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        <SelectGroup>
          {chapters.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {numChapter(item.chapter, true)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
