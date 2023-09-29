import React from "react";
import { externalApi } from "~/lib/api";
import { CustomImage } from "./custom-image";
import { MangaThumnail } from "~/types/manga";
import handleFetch from "~/lib/fetch";

interface MangaThumnailProps {
  className?: string;
  type: string;
  id: string;
  title: string;
  fill?: boolean;
}

export default async function MangaThumnail(props: MangaThumnailProps) {
  const { className, type, id, title, fill } = props;

  const data = await handleFetch<MangaThumnail>(
    `${externalApi.manga}/thumnail/${id}?type=${type}`
  );

  if (!data) return <></>;

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
