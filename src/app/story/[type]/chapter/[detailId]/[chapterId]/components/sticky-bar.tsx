import { ArrowLeft, ArrowRight, List } from "lucide-react";
import Link from "next/link";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { site } from "~/configs/site";
import { MangaChapterDetail, MangaFollow, MangaType } from "~/types/manga";
import FollowButton from "./follow-button";
import StickySelect from "./sticky-select";
import StickyZoom from "./sticky-zoom";

type StickySelectProps = Omit<MangaChapterDetail, "current"> & {
  type: MangaType;
  detailId: string;
  chapterId: string;
  followed?: MangaFollow | null;
};

export default function StickyBar({
  type,
  detailId,
  chapterId,
  canPrev,
  canNext,
  chapters,
  followed,
}: StickySelectProps) {
  const followButton = (
    <FollowButton id={detailId} type={type} followed={followed} />
  );

  const prevButton = (
    <Button
      className="rounded-3xl"
      variant="outline"
      size="icon"
      disabled={canPrev == null}
    >
      <LIcon icon={ArrowLeft} />
    </Button>
  );

  const nextButton = (
    <Button
      className="rounded-3xl"
      variant="outline"
      size="icon"
      disabled={canNext == null}
    >
      <LIcon icon={ArrowRight} />
    </Button>
  );

  return (
    <section className="sticky z-10 top-0 py-2 bg-white dark:bg-black gap-2 max-sm:gap-0 flex justify-center">
      <Link href={`${site.story}/${type}/${detailId}`}>
        <LIcon icon={List} button />
      </Link>
      <div className="md:block max-md:hidden">{followButton}</div>
      {canPrev ? (
        <Link href={`${site.story}/${type}/chapter/${detailId}/${canPrev._id}`}>
          {prevButton}
        </Link>
      ) : (
        <>{prevButton}</>
      )}
      <StickySelect
        type={type}
        detailId={detailId}
        chapterId={chapterId}
        chapters={chapters}
      />
      {canNext ? (
        <Link href={`${site.story}/${type}/chapter/${detailId}/${canNext._id}`}>
          {nextButton}
        </Link>
      ) : (
        <>{nextButton}</>
      )}
      <div className="md:hidden max-md:block">{followButton}</div>
      <StickyZoom />
    </section>
  );
}
