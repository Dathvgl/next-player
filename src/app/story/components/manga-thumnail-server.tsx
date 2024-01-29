import { CustomImage } from "~/components/custom-image/custom-image";
import { getMangaThumnail } from "~/services/manga-service";
import { MangaType } from "~/types/manga";

type MangaThumnailProps = {
  className?: string;
  type: MangaType;
  id: string;
  title: string;
  fill?: boolean;
  hover?: boolean;
};

export default async function MangaThumnailServer({
  className,
  type,
  id,
  title,
  fill,
  hover,
}: MangaThumnailProps) {
  const data = await getMangaThumnail({ id, type });
  if (!data) return null;

  return (
    <CustomImage
      className={className}
      fill={fill}
      hover={hover}
      src={data.src}
      alt={title}
      objectFit="cover"
    />
  );
}
