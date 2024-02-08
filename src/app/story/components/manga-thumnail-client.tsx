"use client";

import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { getMangaThumnail } from "~/services/manga-service";
import { MangaThumnail, MangaType } from "~/types/manga";

type MangaThumnailProps = {
  className?: string;
  type: MangaType;
  id: string;
  title: string;
  fill?: boolean;
  hover?: boolean;
};

export default function MangaThumnailClient({
  className,
  type,
  id,
  title,
  fill,
  hover,
}: MangaThumnailProps) {
  const [data, setData] = useState<MangaThumnail>();

  useEffect(() => {
    async function init() {
      setData(await getMangaThumnail({ id, type }));
    }

    init();
  }, [type, id]);

  if (!data) {
    return <Skeleton className={cn("bg-stone-300", className)} />;
  }

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
