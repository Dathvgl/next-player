"use client";

import { IteratedDataSnapshot } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/auth-context";
import { onceRealtime, pushRealTime } from "~/firebase/firebase";
import ChatMessengerDetail from "./chat-messenger-detail";

export default function ChatMessenger() {
  const uid = useAuth()?.user?.uid;
  const currentUid = useSearchParams().get("uid");
  const [messageId, setMessageId] = useState<string>();
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    handleChat();
  }, [currentUid]);

  async function handleChat() {
    const pathRef = "/messageMember";
    const record = await onceRealtime(pathRef);

    if (currentUid && uid) {
      const group = record.child(currentUid);

      if (group.exists()) {
        // group
        // group
        // group
      } else {
        const list: IteratedDataSnapshot[] = [];

        record.forEach((item) => {
          list.push(item);
        });

        const result = list.find((item) => {
          const chat = item.val();
          return chat[currentUid] && chat[uid];
        });

        if (result) {
          setMessageId(result.key);

          if (uid != currentUid) {
            setMembers([uid, currentUid]);
          } else setMembers([currentUid]);
        } else {
          const push = await pushRealTime(pathRef, {
            [uid]: true,
            [currentUid]: true,
          });

          if (uid != currentUid) {
            setMembers([uid, currentUid]);
          } else setMembers([currentUid]);

          setMessageId(push.key ?? undefined);
        }
      }
    }
  }

  if (!messageId || !uid) return <></>;
  return (
    <ChatMessengerDetail uid={uid} messageId={messageId} members={members} />
  );
}
