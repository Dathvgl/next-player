"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderByChild } from "firebase/database";
import { AnimatePresence } from "framer-motion";
import { Eraser, MoreHorizontal, SendHorizonal, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CustomImage } from "~/components/custom-image/custom-image";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
import { timeFromNow, timestampNow } from "~/lib/convert";
import { MotionLi } from "~/lib/motion";
import { cn } from "~/lib/utils";
import { useAppSelector } from "~/redux/hook";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { postMessageRoom } from "~/services/message-service";
import { UserMessage } from "~/types/user";

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
  members: UserMessage[];
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
        const item = members[index].uid;
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

  async function onRemove(messageId: string) {
    await updateRealTime(`${pathRef}/${messageId}`, { remove: true });
  }

  function onDelete(messageId: string) {}

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
              const member = members.find(({ uid }) => item.uid == uid);

              if (!member) return null;

              return (
                <MotionLi
                  key={`${item.id}-${item.uid}`}
                  className={cn(
                    "flex w-full",
                    receive ? "justify-end" : "justify-start"
                  )}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <section
                    className={cn(
                      "max-w-[40%] flex flex-col gap-2",
                      receive ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "flex gap-2",
                        receive ? "flex-row" : "flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-col",
                          receive ? "items-end" : "items-start"
                        )}
                      >
                        <strong>{member.name}</strong>
                        <i className="text-sm">
                          {timeFromNow(item.timestamp / 1000)}
                        </i>
                      </div>
                      <CustomImage
                        className="w-10 h-10 rounded-full overflow-hidden"
                        src={member.thumnail}
                        alt={member.name}
                      />
                    </div>
                    <div
                      className={cn(
                        "flex gap-2",
                        receive ? "flex-row" : "flex-row-reverse",
                        receive ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className="flex">
                        <div
                          className={cn(
                            "flex",
                            receive ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "px-2.5 py-1.5 rounded text-white w-fit",
                              receive && !item.remove
                                ? "bg-[#0084ff]"
                                : "bg-[#3e4042]"
                            )}
                          >
                            {item.remove ? "Gỡ tin nhắn" : item.message}
                          </div>
                        </div>
                      </div>
                      <div className="w-10 flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className="p-1 w-8 h-8 rounded-full overflow-hidden"
                              variant="ghost"
                            >
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={
                                item.remove
                                  ? undefined
                                  : () => onRemove(item.id)
                              }
                            >
                              <Eraser className="mr-2 h-4 w-4" />
                              <span>Gỡ</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(item.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Xóa</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </section>
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
          <Button className="p-1.5 rounded-full overflow-hidden" type="submit">
            <SendHorizonal />
          </Button>
        </form>
      </Form>
    </section>
  );
}
