"use server";

import { cookies } from "next/headers";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";

type PostMessageRoomProps = {
  roomId?: string;
  uids: string[];
};

export async function postMessageRoom({ roomId, uids }: PostMessageRoomProps) {
  return await handleFetch<{ messageRoomId: string }>({
    url: `${linkApi.message}/room`,
    init: {
      method: "POST",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, uids }),
    },
  });
}
