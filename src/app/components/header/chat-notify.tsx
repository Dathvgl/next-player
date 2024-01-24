"use client";

import { useEffect, useState } from "react";
import { listenRealtime } from "~/firebase/firebase";
import { useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { ChatNotifyType } from "~/types/messenger";
import ChatNotifyDetail from "./chat-notify-detail";

export default function ChatNotify() {
  const uid = useAppSelector(userUIDSelector);
  const [chatNotifies, setChatNotifies] = useState<ChatNotifyType[]>([]);

  useEffect(() => {
    const unsubscribe = listenRealtime(`/chatNotify/${uid}`, (snapshot) => {
      const list: ChatNotifyType[] = [];

      snapshot.forEach((item) => {
        list.push({ ...item.val(), messageId: item.key });
      });

      setChatNotifies(list);
    });

    return () => unsubscribe();
  }, []);

  return <ChatNotifyDetail chatNotifies={chatNotifies} />;
}
