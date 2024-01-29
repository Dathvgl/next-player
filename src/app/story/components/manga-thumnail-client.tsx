"use client";

import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";
import { Skeleton } from "~/components/ui/skeleton";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { MangaThumnail } from "~/types/manga";

interface MangaThumnailProps {
  className?: string;
  type: string;
  id: string;
  title: string;
  fill?: boolean;
  hover?: boolean;
}

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
      const data = await handleFetch<MangaThumnail>({
        url: `${linkApi.manga}/thumnail/${id}?type=${type}`,
      });

      setData(data);
    }

    init();
  }, [type, id]);

  if (!data) return <Skeleton className={`${className} bg-stone-300`} />;

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
