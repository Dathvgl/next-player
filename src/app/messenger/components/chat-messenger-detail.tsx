"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderByChild } from "firebase/database";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
  pushRealTime
} from "~/firebase/firebase";
import { timestampNow } from "~/lib/convert";
import { MotionLi } from "~/lib/motion";

interface MessageLogType {
  id: string;
  uid: string;
  message: string;
  timestamp: number;
}

interface ChatMessengerDetailProps {
  uid: string;
  messageId: string;
}

const formSchema = z.object({
  message: z.string(),
});

export default function ChatMessengerDetail(props: ChatMessengerDetailProps) {
  const { uid, messageId } = props;
  const pathRef = `/messageLog/${messageId}`;

  const [chats, setChats] = useState<MessageLogType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
  }, [messageId]);

  async function onSubmit({ message }: z.infer<typeof formSchema>) {
    form.reset();
    await pushRealTime(pathRef, {
      uid,
      message,
      timestamp: timestampNow(),
    });
  }

  return (
    <div className="flex-1 h-full flex flex-col [&>div>div>div]:h-full">
      <ScrollArea className="flex-1">
        <AnimatePresence initial={false}>
          <ul className="flex flex-col gap-4 p-4 justify-end h-full">
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
                <FormControl className="flex-1 !m-0 no-focus-tw-ring">
                  <Input placeholder="Tin nhắn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
