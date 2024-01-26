import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { MangaThumnail } from "~/types/manga";
import { CustomImage } from "../../../components/custom-image";

interface MangaThumnailProps {
  className?: string;
  type: string;
  id: string;
  title: string;
  fill?: boolean;
}

export default async function MangaThumnailServer(props: MangaThumnailProps) {
  const { className, type, id, title, fill } = props;

  const data = await handleFetch<MangaThumnail>({
    url: `${linkApi.manga}/thumnail/${id}?type=${type}`,
  });

  if (!data) return null;

  return (
    <CustomImage
      className={className}
      fill={fill}
      src={data.src}
      alt={title}
      objectFit="cover"
    />
  );
}
