"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import {
  MangaChapter,
  MangaChapterDetail,
  MangaDetail,
  MangaListAdmin,
  MangaThumnail,
  MangaType,
} from "~/types/manga";
import { FetchQuery } from "~/types/type";

type BaseProps = { id: string; type: MangaType };

export async function getMangaDetail({ id, type }: BaseProps) {
  return await handleFetch<MangaDetail>({
    url: `${linkApi.manga}/detail/${id}?type=${type}`,
    init: { next: { tags: [`mangaDetail/${id}`] } },
  });
}

export async function getMangaThumnail({ id, type }: BaseProps) {
  return await handleFetch<MangaThumnail>({
    url: `${linkApi.manga}/thumnail/${id}?type=${type}`,
    init: { next: { tags: [`mangaThumnail/${id}`] } },
  });
}

export async function getMangaChapters({ id, type }: BaseProps) {
  return await handleFetch<MangaChapter[]>({
    url: `${linkApi.manga}/chapter/${id}?type=${type}`,
    init: { next: { tags: [`mangaChapters/${id}`] } },
  });
}

export async function getMangaChapterImage({
  id: detailId,
  chapterId,
  type,
}: BaseProps & { chapterId: string }) {
  return await handleFetch<MangaChapterDetail>({
    url: `${linkApi.manga}/chapter/${detailId}/${chapterId}?type=${type}`,
    init: { next: { tags: [`mangaChapterImage/${detailId}/${chapterId}`] } },
  });
}

// Admin
export async function getMangaAdmin({
  page,
  type,
}: FetchQuery & { type: MangaType }) {
  const url = new URL(`${linkApi.manga}/list`);

  const params = new URLSearchParams({
    admin: "true",
    sort: "desc",
    order: "lastest",
    type,
    page: page.toString(),
  });

  url.search = params.toString();

  return await handleFetch<MangaListAdmin>({
    url: url.toString(),
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["mangaAdmin"] },
    },
  });
}

export async function postMangaAdmin(props: {
  type?: string;
  href?: string;
  limit?: number;
}) {
  await handleFetch({
    url: `${linkApi.manga}/detailCrawl`,
    init: {
      method: "POST",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    },
  });

  revalidateTag("mangaAdmin");
}

type PutMangaAdminProps = {
  id: string;
  data: FormData;
};

export async function putMangaAdmin({ id, data }: PutMangaAdminProps) {
  await handleFetch({
    url: `${linkApi.manga}/detail/${id}`,
    init: {
      method: "PUT",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
      },
      body: data,
    },
  });

  if (!data.entries().next().done) {
    revalidateTag(`mangaDetail/${id}`);
    revalidateTag("mangaAdmin");
  }

  if (data.has("file")) {
    revalidateTag(`mangaThumnail/${id}`);
  }
}

type PutMangaAdminChapterImageProps = {
  detailId: string;
  chapterId: string;
  data: FormData;
};

export async function putMangaAdminChapterImage({
  detailId,
  chapterId,
  data,
}: PutMangaAdminChapterImageProps) {
  await handleFetch({
    url: `${linkApi.manga}/chapter/${detailId}/${chapterId}`,
    init: {
      method: "PUT",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
      },
      body: data,
    },
  });

  revalidateTag(`mangaChapterImage/${detailId}/${chapterId}`);
}
