"use client";

import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "~/components/ui/input";
import { listQueryStore } from "~/firebase/firebase";
import { ChatPeopleType } from "~/types/messenger";
import ListMessengerDetail from "./list-messenger-detail";

export default function FindMessenger({ uid }: { uid: string | null }) {
  const [people, setPeople] = useState<ChatPeopleType[]>([]);
  const [text, setText] = useState<string>("");
  const search = useDebounce(text);

  useEffect(() => {
    if (search) init(search);
    else setPeople([]);
  }, [search]);

  async function init(search: string) {
    const snapshot = await listQueryStore(
      "users",
      where("displayName", "==", search)
    );

    if (snapshot.empty) {
      setPeople([]);
      return;
    }

    const list: ChatPeopleType[] = [];

    snapshot.forEach((item) => {
      if (!item.exists()) return;
      list.push(item.data() as ChatPeopleType);
    });

    setPeople(list);
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <Input
        placeholder="Search user"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <ul>
        {people.map((item) => (
          <ListMessengerDetail key={item.uid} person={item} currentUid={uid} />
        ))}
      </ul>
    </div>
  );
}
