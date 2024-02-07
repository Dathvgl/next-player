"use client";

import { where } from "firebase/firestore";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { listenListStore } from "~/database/firebase";
import { timeFromNow } from "~/lib/convert";
import {
  ChatMessageUser,
  ChatNotifyType,
  ChatPeopleType,
} from "~/types/message";
import { UserMessage } from "~/types/user";

type ChatNotifyDetailProps = {
  users: UserMessage[];
  chatNotifies: ChatNotifyType[];
};

export default function ChatNotifyDetail({
  users,
  chatNotifies,
}: ChatNotifyDetailProps) {
  const badge = chatNotifies.filter(({ seen }) => !seen).length;
  const [people, setPeople] = useState<ChatMessageUser[]>([]);

  useEffect(() => {
    if (chatNotifies.length == 0) return;
    const uids = chatNotifies.map(({ sender }) => sender);

    const unsubscribe = listenListStore(
      "users",
      (snapshot) => {
        if (snapshot.empty) return;
        const list: ChatMessageUser[] = [];

        snapshot.forEach((item) => {
          const data = item.data() as ChatPeopleType;
          if (!item.exists()) return;

          const result = users.find(({ uid }) => uid == data.uid);
          if (!result) return;

          list.push({ ...data, ...result });
        });

        setPeople(list);
      },
      [where("uid", "in", uids)]
    );

    return () => {
      unsubscribe();
    };
  }, [JSON.stringify(chatNotifies)]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <button>
            <LIcon className="w-5 h-5" icon={MessageCircle} button />
          </button>
          {badge != 0 && (
            <strong className="w-7 h-7 flex items-center justify-center absolute -top-2 -right-2 rounded-full bg-red-500">
              {badge > 99 ? 99 : badge}
            </strong>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <ScrollArea className="h-[318px]">
          <ul className="p-2">
            {chatNotifies.length != 0 ? (
              chatNotifies
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((item, index) => {
                  const person = people.find(({ uid }) => uid == item.sender);
                  if (!person) return <Fragment key={index} />;

                  return (
                    <li
                      key={item.messageId}
                      className="rounded overflow-hidden p-2 hover:bg-black/20 dark:hover:bg-white/20"
                    >
                      <Link
                        className="flex items-center gap-4"
                        href={`/message?uid=${item.messageId}`}
                      >
                        <CustomImage
                          className="w-12 h-12 rounded-full overflow-hidden"
                          src={person.thumnail}
                          alt={person.name}
                        />
                        <div className="flex-1">
                          <b>{person.name}</b>
                          <div className="flex justify-between gap-2">
                            <p className="flex-1 line-clamp-1">
                              {item.content}
                            </p>
                            <i className="text-gray-500 dark:text-gray-400">
                              {timeFromNow(item.timestamp / 1000)}
                            </i>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })
            ) : (
              <>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="px-2 py-1.5 h-[60px] gap-2 flex justify-between items-center"
                    >
                      <Skeleton className="w-12 h-full rounded-full bg-stone-300" />
                      <div className="flex-1 flex flex-col gap-2 h-full">
                        <Skeleton className="w-full flex-1 bg-stone-300" />
                        <Skeleton className="w-full flex-1 bg-stone-300" />
                      </div>
                    </div>
                  ))}
              </>
            )}
          </ul>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
