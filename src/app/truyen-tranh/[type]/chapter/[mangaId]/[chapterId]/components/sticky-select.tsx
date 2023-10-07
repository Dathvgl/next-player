"use client";

import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useGridBreak from "~/hooks/grid-break";
import { numChapter } from "~/lib/convert";
import { MotionSection } from "~/lib/motion";
import { MangaChapterDetail } from "~/types/manga";
import FollowButton from "./follow-button";

interface StickySelectProps extends Omit<MangaChapterDetail, "current"> {
  id: string;
  type: string;
  currentId: string;
  onZoom: (str: "plus" | "minus") => void;
}

export default function StickySelect(props: StickySelectProps) {
  const { id, type, currentId, canPrev, canNext, chapters, onZoom } = props;

  const router = useRouter();
  const gridBreak = useGridBreak(["xs", "lg", "xl"]);

  const prevBtn = (
    <Button
      className="rounded-3xl"
      variant="outline"
      size="icon"
      disabled={canPrev == null}
    >
      <LIcon icon={ArrowLeft} />
    </Button>
  );

  const nextBtn = (
    <Button
      className="rounded-3xl"
      variant="outline"
      size="icon"
      disabled={canNext == null}
    >
      <LIcon icon={ArrowRight} />
    </Button>
  );

  function onSelect(selected: string) {
    if (selected != currentId) {
      router.push(`/truyen-tranh/${type}/chapter/${id}/${selected}`);
    }
  }

  return (
    <MotionSection className="sticky top-0 py-2 bg-white dark:bg-black gap-2 flex justify-center">
      <FollowButton id={currentId} chapters={chapters.map(({ _id }) => _id)} />
      {canPrev ? (
        <Link href={`/truyen-tranh/${type}/chapter/${id}/${canPrev._id}`}>
          {prevBtn}
        </Link>
      ) : (
        <>{prevBtn}</>
      )}
      <Select defaultValue={currentId} onValueChange={onSelect}>
        <SelectTrigger className="w-32 no-focus-tw-ring">
          <SelectValue placeholder="Chọn chapter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chapters.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {numChapter(item.chapter, true)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {canNext ? (
        <Link href={`/truyen-tranh/${type}/chapter/${id}/${canNext._id}`}>
          {nextBtn}
        </Link>
      ) : (
        <>{nextBtn}</>
      )}
      {gridBreak != "sm" && (
        <>
          <Button
            className="rounded-3xl"
            variant="outline"
            size="icon"
            onClick={() => onZoom("plus")}
          >
            <LIcon icon={ZoomIn} />
          </Button>
          <Button
            className="rounded-3xl"
            variant="outline"
            size="icon"
            onClick={() => onZoom("minus")}
          >
            <LIcon icon={ZoomOut} />
          </Button>
        </>
      )}
    </MotionSection>
  );
}
