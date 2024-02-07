"use client";

import { useEffect, useState } from "react";
import { listenRealtime } from "~/database/firebase";
import { useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { ChatNotifyType } from "~/types/message";
import ChatNotifyDetail from "./chat-notify-detail";
import { postMessageUsers } from "~/services/user-service";
import { UserMessage } from "~/types/user";

export default function ChatNotify() {
  const uid = useAppSelector(userUIDSelector);

  const [users, setUsers] = useState<UserMessage[]>([]);
  const [chatNotifies, setChatNotifies] = useState<ChatNotifyType[]>([]);

  useEffect(() => {
    const unsubscribe = listenRealtime(
      `/chatNotify/${uid}`,
      async (snapshot) => {
        const list: ChatNotifyType[] = [];

        snapshot.forEach((item) => {
          list.push({ ...item.val(), messageId: item.key });
        });

        const data = await postMessageUsers(list.map(({ sender }) => sender));

        setUsers(data ?? []);
        setChatNotifies(list);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return <ChatNotifyDetail users={users} chatNotifies={chatNotifies} />;
}
