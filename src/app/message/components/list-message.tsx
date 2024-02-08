"use client";

import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { listenListStore } from "~/database/firebase";
import { useAppSelector } from "~/redux/hook";
import { messageChatListSelector } from "~/redux/selectors/message-selector";
import { ChatMessageUser, ChatPeopleType } from "~/types/message";
import ListMessageDetail from "./list-message-detail";

export default function ListMessage() {
  const chatList = useAppSelector(messageChatListSelector);
  const [people, setPeople] = useState<ChatMessageUser[]>([]);

  useEffect(() => {
    if (chatList.length == 0) return;

    const unsubscribe = listenListStore(
      "users",
      (snapshot) => {
        if (snapshot.empty) return;
        const list: ChatMessageUser[] = [];

        snapshot.forEach((item) => {
          const data = item.data() as ChatPeopleType;
          if (!item.exists()) return;

          const result = chatList.find(({ uid }) => uid == data.uid);
          if (!result) return;

          list.push({ ...data, ...result });
        });

        setPeople(list);
      },
      [
        where(
          "uid",
          "in",
          chatList.map(({ uid }) => uid)
        ),
      ]
    );

    return () => unsubscribe();
  }, [JSON.stringify(chatList)]);

  if (people.length == 0) return null;

  return (
    <ul className="p-3">
      {people.map((item) => (
        <ListMessageDetail key={item.uid} data={item} extra />
      ))}
    </ul>
  );
}
