"use server";

import { revalidateTag } from "next/cache";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { FetchList, FetchQuery } from "~/types/type";
import { User, UserPost } from "~/types/user";

// Auth
export async function postAuthSignIn(idToken: string) {
  await handleFetch({
    url: `${linkApi.user}/session-signin`,
    init: {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    },
  });

  revalidateTag("user");
}

export async function postAuthSignOut() {
  await handleFetch({
    url: `${linkApi.user}/session-signout`,
    init: {
      method: "POST",
      credentials: "include",
    },
  });

  revalidateTag("user");
}

// User
export async function getUser() {
  return await handleFetch<User>({
    url: `${linkApi.user}/once`,
    init: {
      credentials: "include",
      next: { tags: ["user"] },
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
      credentials: "include",
      next: { tags: ["users"] },
    },
  });
}

export async function putUser(props: { id: string; data: UserPost }) {
  await handleFetch({
    url: `${linkApi.user}/${props.id}`,
    init: {
      method: "PUT",
      credentials: "include",
      headers: {
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
      credentials: "include",
      headers: {
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
      credentials: "include",
    },
  });

  revalidateTag("user");
  revalidateTag("users");
}
