"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listenStore } from "~/database/firebase";
import { MessageRoom } from "~/types/message";
import ChatMessageDetail from "./chat-message-detail";

export default function ChatMessage() {
  const roomId = useSearchParams().get("room");
  const roomUid = useSearchParams().get("uid");

  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = listenStore("messageRoom", roomId, (doc) => {
      if (!doc.exists()) return;
      const data = doc.data() as MessageRoom;
      setMembers(data.uids);
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
