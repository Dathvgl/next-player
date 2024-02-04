"use client";

import { IteratedDataSnapshot } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { onceRealtime, pushRealTime, setStore } from "~/firebase/firebase";
import { useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import ChatMessengerDetail from "./chat-messenger-detail";

export default function ChatMessenger() {
  const uid = useAppSelector(userUIDSelector);
  const currentUid = useSearchParams().get("uid");
  const [messageId, setMessageId] = useState<string>();
  const [members, setMembers] = useState<string[]>([]);

  const handleChat = useCallback(async () => {
    const pathRef = "/messageMember";
    const record = await onceRealtime(pathRef);

    if (currentUid && uid) {
      const group = record.child(currentUid);

      if (group.exists()) {
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
            await setStore(
              "chatFriends",
              uid,
              { [currentUid]: true },
              { merge: true }
            );

            await setStore(
              "chatFriends",
              currentUid,
              { [uid]: true },
              { merge: true }
            );

            setMembers([uid, currentUid]);
          } else {
            await setStore(
              "chatFriends",
              uid,
              { [currentUid]: true },
              { merge: true }
            );

            setMembers([currentUid]);
          }

          setMessageId(push.key ?? undefined);
        }
      }
    }
  }, [currentUid, uid]);

  useEffect(() => {
    handleChat();
  }, [handleChat]);

  if (!messageId || !uid) return null;
  return (
    <ChatMessengerDetail uid={uid} messageId={messageId} members={members} />
  );
}
