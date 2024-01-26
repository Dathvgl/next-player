"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { FetchList, FetchQuery } from "~/types/type";
import { User, UserPost } from "~/types/user";

export async function getUser() {
  return await handleFetch<User>({
    url: `${linkApi.user}/once`,
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["user"], revalidate: 60 },
    },
  });
}

export async function getUsers({ page }: FetchQuery) {
  const url = new URL(linkApi.user);

  const params = new URLSearchParams({
    page: page.toString(),
  });

  url.search = params.toString();

  return await handleFetch<FetchList<User>>({
    url: linkApi.user,
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["users"] },
    },
  });
}

export async function putUser(props: { id: string; data: UserPost }) {
  await handleFetch({
    url: `${linkApi.user}/${props.id}`,
    init: {
      method: "PUT",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    },
  });

  revalidateTag("user");
  revalidateTag("users");
}

export async function putUserRoles(props: {
  id: string;
  data: { roles: string[] };
}) {
  await handleFetch({
    url: `${linkApi.user}/roles/${props.id}`,
    init: {
      method: "PUT",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    },
  });

  revalidateTag("user");
  revalidateTag("users");
}

export async function deleteUser(props: string) {
  await handleFetch({
    url: `${linkApi.user}/${props}`,
    init: {
      method: "DELETE",
      headers: { Cookie: cookies().toString() },
    },
  });

  revalidateTag("user");
  revalidateTag("users");
}
