"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "~/contexts/auth-context";
import { listenRealtime } from "~/firebase/firebase";
import { useFirebaseInfos } from "~/hooks/firebase-info";
import { timeFromNow } from "~/lib/convert";

interface ChatNotifyType {
  messageId: string;
  seen: boolean;
  sender: string;
  content: string;
  timestamp: number;
}

export default function ChatNotify() {
  const uid = useAuth()?.user?.uid ?? "";
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

interface ChatNotifyDetailProps {
  chatNotifies: ChatNotifyType[];
}

function ChatNotifyDetail({ chatNotifies }: ChatNotifyDetailProps) {
  const infos = useFirebaseInfos(chatNotifies.map(({ sender }) => sender));
  const badge = chatNotifies.filter(({ seen }) => !seen).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <button>
            <LIcon className="w-5 h-5" icon={MessageCircle} button />
          </button>
          {badge && (
            <strong className="w-7 h-7 flex items-center justify-center absolute -top-2 -right-2 rounded-full bg-red-500">
              {badge > 99 ? 99 : badge}
            </strong>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <ul className="p-2">
          {chatNotifies.map((item, index) => {
            const info = infos?.find(({ uid }) => uid == item.sender);
            if (!info) return <Fragment key={index} />;

            return (
              <li
                key={item.messageId}
                className="rounded overflow-hidden p-2 hover:bg-black/20 dark:hover:bg-white/20"
              >
                <Link
                  className="flex items-center gap-4"
                  href={`/messenger?uid=${item.messageId}`}
                >
                  <CustomImage
                    className="w-12 h-12 rounded-full overflow-hidden"
                    src={info.photoURL ?? ""}
                    alt={info.displayName ?? "Người lạ"}
                  />
                  <div className="flex-1">
                    <b>{info.displayName}</b>
                    <div className="flex justify-between gap-2">
                      <p className="flex-1 line-clamp-1">{item.content}</p>
                      <i className="text-gray-500 dark:text-gray-400">
                        {timeFromNow(item.timestamp / 1000)}
                      </i>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
