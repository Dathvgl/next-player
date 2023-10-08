"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { listenListStore, listenStore } from "~/firebase/firebase";
import ListMessengerDetail from "./list-messenger-detail";
import { where } from "firebase/firestore";
import { ChatPeopleType } from "~/types/messenger";
import FindMessenger from "./find-messenger";
import { useAuth } from "~/contexts/auth-context";

export default function ListMessenger() {
  const uid = useAuth()?.user?.uid;
  const currentUid = useSearchParams().get("uid");
  const [uids, setUids] = useState<string[]>([]);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenStore("chatFriends", uid, (doc) => {
      if (doc.exists()) {
        const data: Record<string, unknown> = doc.data();
        setUids(Object.keys(data));
      }
    });

    return () => unsubscribe();
  }, []);

  return <ListMessengerPass uid={currentUid} uids={uids} />;
}

function ListMessengerPass({
  uid,
  uids,
}: {
  uid: string | null;
  uids: string[];
}) {
  const [people, setPeople] = useState<ChatPeopleType[]>([]);

  useEffect(() => {
    if (uids.length == 0) return;
    const unsubscribe = listenListStore(
      "users",
      (snapshot) => {
        if (snapshot.empty) return;
        const list: ChatPeopleType[] = [];

        snapshot.forEach((item) => {
          if (!item.exists()) return;
          list.push(item.data() as ChatPeopleType);
        });

        setPeople(list);
      },
      where("uid", "in", uids)
    );

    return () => unsubscribe();
  }, [uids.length]);

  return (
    <ScrollArea className="h-full max-md:h-36">
      <div className="flex flex-col w-[320px] max-md:w-full divide-y divide-black dark:divide-white">
        <FindMessenger uid={uid} />
        {people.length != 0 && (
          <ul className="p-2">
            {people.map((item) => (
              <ListMessengerDetail
                key={item.uid}
                person={item}
                currentUid={uid}
              />
            ))}
          </ul>
        )}
      </div>
    </ScrollArea>
  );
}
