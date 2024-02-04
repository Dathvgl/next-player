import Link from "next/link";
import { Button } from "~/components/ui/button";
import { site } from "~/configs/site";
import { MangaChapter, MangaType } from "~/types/manga";
import MangaButtonContinue from "./manga-button-continue";

type MangaButtonProps = {
  id: string;
  type: MangaType;
  chapters?: MangaChapter[];
};

export default function MangaButton({ type, id, chapters }: MangaButtonProps) {
  if (!chapters) return null;
  const sort = chapters.sort((a, b) => a.chapter - b.chapter);
  if (sort.length == 0) return null;

  return (
    <div className="flex gap-4">
      <Link
        href={`${site.story}/${type}/chapter/${id}/${sort[0]._id}`}
        className="flex-1"
      >
        <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
          Đọc từ đầu
        </Button>
      </Link>
      <Link
        href={`${site.story}/${type}/chapter/${id}/${
          sort[sort.length - 1]._id
        }`}
        className="flex-1"
      >
        <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
          Đọc mới nhất
        </Button>
      </Link>
      <MangaButtonContinue
        id={id}
        type={type}
        chapters={sort.map(({ _id }) => _id)}
      />
    </div>
  );
}
