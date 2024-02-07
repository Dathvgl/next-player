"use client";

import { where } from "firebase/firestore";
import { useEffect } from "react";
import { listenListStore } from "~/database/firebase";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { messageChatList } from "~/redux/slices/message-slice";
import { postMessageUsers } from "~/services/user-service";
import { MessageRoom } from "~/types/message";

export default function MessageHandler() {
  const uid = useAppSelector(userUIDSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = listenListStore(
      "messageRoom",
      async ({ empty, docs }) => {
        if (empty) return;

        const data = docs.map((item) => {
          return item.data() as MessageRoom;
        });

        const uids = data
          .map(({ uids }) => uids.filter((item) => item != uid))
          .flat();

        const users = await postMessageUsers([uid, ...uids]);
        dispatch(messageChatList(users ?? []));
      },
      [where("uids", "array-contains", uid), where("type", "==", "single")]
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
}
