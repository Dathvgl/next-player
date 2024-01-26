"use server";

import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";

export async function postAuthSignIn(idToken: string) {
  await handleFetch({
    url: `${linkApi.user}/session-signin`,
    init: {
      method: "POST",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    },
  });
}

export async function postAuthSignOut() {
  await handleFetch({
    url: `${linkApi.user}/session-signout`,
    init: {
      method: "POST",
      headers: { Cookie: cookies().toString() },
    },
  });
}
