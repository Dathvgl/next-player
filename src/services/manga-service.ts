import { revalidateTag } from "next/cache";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { MangaListAdmin, MangaType } from "~/types/manga";
import { FetchQuery } from "~/types/type";

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
      credentials: "include",
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
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    },
  });

  revalidateTag("mangaAdmin");
}
