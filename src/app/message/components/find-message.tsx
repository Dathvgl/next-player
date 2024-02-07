"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "~/components/ui/input";
import { getMessageUsers } from "~/services/user-service";
import { UserMessage } from "~/types/user";
import ListMessageDetail from "./list-message-detail";

export default function FindMessage() {
  const [people, setPeople] = useState<UserMessage[]>([]);
  const [text, setText] = useState<string>("");
  const search = useDebounce(text);

  useEffect(() => {
    async function init(search: string) {
      const data = await getMessageUsers(search);

      if (!data) {
        setPeople([]);
        return;
      }

      setPeople(data);
    }

    if (search) init(search);
    else setPeople([]);
  }, [search]);

  return (
    <div className="p-2 flex flex-col gap-2">
      <Input
        placeholder="Search user"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <ul>
        {people.map((item) => (
          <ListMessageDetail key={item.uid} data={item} />
        ))}
      </ul>
    </div>
  );
}
