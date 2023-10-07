import Link from "next/link";
import { Button } from "~/components/ui/button";
import { MangaChapter } from "~/types/manga";
import MangaButtonContinue from "./manga-button-continue";

interface MangaButtonProps {
  id: string;
  type: string;
  chapters?: MangaChapter[];
}

export default function MangaButton({ type, id, chapters }: MangaButtonProps) {
  if (!chapters) return <></>;
  const sort = chapters.sort((a, b) => a.chapter - b.chapter);
  if (sort.length == 0) return <></>;

  return (
    <div className="flex gap-4">
      <Link href={`/truyen-tranh/${type}/chapter/${id}/${sort[0]._id}`}>
        <Button className="flex-1">Đọc từ đầu</Button>
      </Link>
      <Link
        href={`/truyen-tranh/${type}/chapter/${id}/${
          sort[sort.length - 1]._id
        }`}
      >
        <Button className="flex-1">Đọc mới nhất</Button>
      </Link>
      <MangaButtonContinue
        type={type}
        id={id}
        chapters={sort.map(({ _id }) => _id)}
      />
    </div>
  );
}
