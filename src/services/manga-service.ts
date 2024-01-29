"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import {
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
    init: { next: { tags: ["mangaDetail"] } },
  });
}

export async function getMangaThumnail({ id, type }: BaseProps) {
  return await handleFetch<MangaThumnail>({
    url: `${linkApi.manga}/thumnail/${id}?type=${type}`,
    init: { next: { tags: ["mangaThumnail"] } },
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
