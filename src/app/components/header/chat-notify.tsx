"use client";

import { useEffect, useState } from "react";
import { listenRealtime } from "~/database/firebase";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { ChatNotifyType } from "~/types/message";
import ChatNotifyDetail from "./chat-notify-detail";
import { postMessageUsers } from "~/services/user-service";
import { UserMessage } from "~/types/user";
import { messageChatNotify } from "~/redux/slices/message-slice";

export default function ChatNotify() {
  const uid = useAppSelector(userUIDSelector);
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<UserMessage[]>([]);

  useEffect(() => {
    const unsubscribe = listenRealtime(
      `/chatNotify/${uid}`,
      async (snapshot) => {
        const list: ChatNotifyType[] = [];

        snapshot.forEach((item) => {
          list.push({ ...item.val(), roomId: item.key });
        });

        const data = await postMessageUsers(list.map(({ sender }) => sender));

        setUsers(data ?? []);
        dispatch(messageChatNotify(list));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return <ChatNotifyDetail users={users} />;
}
