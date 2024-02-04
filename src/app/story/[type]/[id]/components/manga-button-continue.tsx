import Link from "next/link";
import { Button } from "~/components/ui/button";
import { site } from "~/configs/site";
import { getMangaUserFollow } from "~/services/manga-service";
import { MangaType } from "~/types/manga";

type MangaButtonContinueProps = {
  id: string;
  type: MangaType;
  chapters: string[];
};

export default async function MangaButtonContinue({
  id,
  type,
  chapters,
}: MangaButtonContinueProps) {
  const data = await getMangaUserFollow({ id, type });

  if (!data) return null;
  const result = chapters.find((item) => item == data.currentChapterId);
  if (!result) return null;

  return (
    <Link
      href={`${site.story}/${type}/chapter/${id}/${result}`}
      className="flex-1"
    >
      <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
        Đọc tiếp
      </Button>
    </Link>
  );
}
