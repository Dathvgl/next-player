"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listenStore } from "~/database/firebase";
import { postMessageUsers } from "~/services/user-service";
import { MessageRoom } from "~/types/message";
import { UserMessage } from "~/types/user";
import ChatMessageDetail from "./chat-message-detail";

export default function ChatMessage() {
  const roomId = useSearchParams().get("room");
  const roomUid = useSearchParams().get("uid");

  const [members, setMembers] = useState<UserMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = listenStore("messageRoom", roomId, async (doc) => {
      if (!doc.exists()) return;
      const { uids } = doc.data() as MessageRoom;
      const data = await postMessageUsers(uids);
      setMembers(data ?? []);
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  if (!roomId || !roomUid) return null;

  return (
    <ChatMessageDetail roomId={roomId} roomUid={roomUid} members={members} />
  );
}
