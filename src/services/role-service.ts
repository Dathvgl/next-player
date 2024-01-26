"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { Role, RolePost, RoleType, RoleTypePost } from "~/types/role";
import { FetchList, FetchQuery } from "~/types/type";

// Role
export async function getRoles({ page }: FetchQuery) {
  const url = new URL(linkApi.role);

  const params = new URLSearchParams({
    page: page.toString(),
  });

  url.search = params.toString();

  return await handleFetch<FetchList<Role>>({
    url: url.toString(),
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["roles"] },
    },
  });
}

export async function getRoleAll() {
  return await handleFetch<Role[]>({
    url: `${linkApi.role}/all`,
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["roleAll"] },
    },
  });
}

export async function postRole(props: RolePost) {
  await handleFetch({
    url: linkApi.role,
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

  revalidateTag("roles");
  revalidateTag("roleAll");
}

export async function putRole(props: { id: string; data: RolePost }) {
  await handleFetch({
    url: `${linkApi.role}/${props.id}`,
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

  revalidateTag("roles");
  revalidateTag("roleAll");
}

export async function deleteRole(props: string) {
  await handleFetch({
    url: `${linkApi.role}/${props}`,
    init: {
      method: "DELETE",
      headers: { Cookie: cookies().toString() },
    },
  });

  revalidateTag("roles");
  revalidateTag("roleAll");
}

// Role type
export async function getRoleTypes({ page }: FetchQuery) {
  const url = new URL(`${linkApi.role}/type`);

  const params = new URLSearchParams({
    page: page.toString(),
  });

  url.search = params.toString();

  return await handleFetch<FetchList<Role>>({
    url: url.toString(),
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["roleTypes"] },
    },
  });
}

export async function getRoleTypeAll() {
  return await handleFetch<RoleType[]>({
    url: `${linkApi.role}/type/all`,
    init: {
      headers: { Cookie: cookies().toString() },
      next: { tags: ["roleTypeAll"] },
    },
  });
}

export async function postRoleType(props: RoleTypePost) {
  await handleFetch({
    url: `${linkApi.role}/type`,
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

  revalidateTag("roleTypes");
  revalidateTag("roleTypeAll");
}

export async function putRoleType(props: { id: string; data: RoleTypePost }) {
  await handleFetch({
    url: `${linkApi.role}/type/${props.id}`,
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

  revalidateTag("roleTypes");
  revalidateTag("roleTypeAll");
}

export async function deleteRoleType(props: string) {
  await handleFetch({
    url: `${linkApi.role}/type/${props}`,
    init: {
      method: "DELETE",
      headers: { Cookie: cookies().toString() },
    },
  });

  revalidateTag("roleTypes");
  revalidateTag("roleTypeAll");
}
