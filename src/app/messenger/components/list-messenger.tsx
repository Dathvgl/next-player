"use client";

import { orderByChild } from "firebase/database";
import { useEffect, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { listenRealtime } from "~/firebase/firebase";
import ListMessengerDetail from "./list-messenger-detail";
import { useSearchParams } from "next/navigation";

interface PeopleType {
  uid: string;
  status: "online" | "offline";
  lastTimeOnline: number;
}

export default function ListMessenger() {
  const pathRef = "/status";
  const currentUid = useSearchParams().get("uid");
  const [people, setPeople] = useState<PeopleType[]>([]);

  useEffect(() => {
    const unsubscribe = listenRealtime(
      pathRef,
      (snapshot) => {
        const list: PeopleType[] = [];

        snapshot.forEach((item) => {
          list.push({ ...item.val(), uid: item.key });
        });

        setPeople(list);
      },
      [orderByChild("timestamp")]
    );

    return () => unsubscribe();
  }, []);

  return (
    <ScrollArea className="w-[25%] h-full">
      <ul className="p-2">
        {people.map((item) => (
          <ListMessengerDetail
            key={item.uid}
            person={item}
            currentUid={currentUid}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
