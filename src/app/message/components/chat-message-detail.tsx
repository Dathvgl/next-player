"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderByChild } from "firebase/database";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  listenRealtime,
  onceRealtime,
  pushRealTime,
  updateRealTime,
  writeRealTime,
} from "~/database/firebase";
import { timestampNow } from "~/lib/convert";
import { MotionLi } from "~/lib/motion";
import { useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { postMessageRoom } from "~/services/message-service";

type MessageLogType = {
  id: string;
  uid: string;
  remove: boolean;
  message: string;
  timestamp: number;
};

type ChatMessageDetailProps = {
  roomId: string;
  roomUid: string;
  members: string[];
};

const formSchema = z.object({
  message: z.string(),
});

export default function ChatMessageDetail({
  roomId,
  roomUid,
  members,
}: ChatMessageDetailProps) {
  const pathRef = `/messageLog/${roomId}`;

  const uid = useAppSelector(userUIDSelector);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLUListElement>(null);

  const [chats, setChats] = useState<MessageLogType[]>([]);
  const [chatHeight, setChatHeight] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!chatRef.current) return;

    const resizeObserver = new ResizeObserver((event) => {
      setChatHeight(event[0].contentRect.height);
    });

    resizeObserver.observe(chatRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current?.children[1];
    scroll?.scrollTo({ top: scroll?.scrollHeight, behavior: "smooth" });
  }, [chatHeight]);

  useEffect(() => {
    const unsubscribe = listenRealtime(
      pathRef,
      (snapshot) => {
        const list: MessageLogType[] = [];

        snapshot.forEach((item) => {
          list.push({ ...item.val(), id: item.key });
        });

        setChats(list);
      },
      [orderByChild("timestamp")]
    );

    return () => unsubscribe();
  }, [pathRef]);

  async function onSubmit({ message }: z.infer<typeof formSchema>) {
    form.reset();

    await postMessageRoom({ roomId, uids: [uid, roomUid] });

    await pushRealTime(pathRef, {
      uid,
      message,
      remove: false,
      timestamp: timestampNow(),
    }).then(async () => {
      const { length } = members;

      for (let index = 0; index < length; index++) {
        const item = members[index];
        const pathRef = `/chatNotify/${item}/${roomId}`;

        const once = await onceRealtime(pathRef);
        if (once.exists()) {
          if (uid == once.val().sender) {
            await updateRealTime(pathRef, {
              seen: false,
              content: message,
              timestamp: timestampNow(),
            });
          } else {
            await updateRealTime(pathRef, {
              seen: false,
              sender: uid,
              roomId,
              content: message,
              timestamp: timestampNow(),
            });
          }
        } else {
          await writeRealTime(pathRef, {
            seen: false,
            sender: uid,
            roomId,
            content: message,
            timestamp: timestampNow(),
          });
        }
      }
    });
  }

  return (
    <section className="flex-1 h-full flex flex-col [&>div>div>div]:h-full">
      <ScrollArea ref={scrollRef} className="flex-1">
        <AnimatePresence initial={false}>
          <ul
            ref={chatRef}
            className="flex flex-col gap-4 p-4 justify-end h-full"
          >
            {chats.map((item) => {
              const receive = item.uid == uid;
              return (
                <MotionLi
                  key={`${item.id}-${item.uid}`}
                  className={`flex w-full ${
                    receive ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <div
                    className={`px-3 py-2 rounded text-white max-w-[40%] ${
                      receive ? "bg-[#0084ff]" : "bg-[#3e4042]"
                    }`}
                  >
                    {item.message}
                  </div>
                </MotionLi>
              );
            })}
          </ul>
        </AnimatePresence>
      </ScrollArea>
      <Form {...form}>
        <form
          className="p-4 flex items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="message"
            defaultValue=""
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 flex items-center gap-4 ">
                <FormLabel>Message</FormLabel>
                <FormControl className="flex-1 !m-0">
                  <Input autoComplete="off" placeholder="Tin nhắn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
