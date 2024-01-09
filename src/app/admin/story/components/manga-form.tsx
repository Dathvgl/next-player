"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { MangaType } from "~/types/manga";

const schema = z.object({
  href: z.string(),
  type: z.string(),
  limit: z.string().optional(),
});

export default function MangaForm({ type }: { type: MangaType }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: { href: "", type, limit: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const data = await handleFetch(
        `${externalApi.manga}/detailCrawl?type=${values.type}&href=${values.href}&limit=${values.limit}`
      );

      console.log(data);
    } catch (error) {
      toast({ title: "Lỗi crawl" });
    }
  }

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Href truyện</FormLabel>
                  <FormDescription>Đường dẫn truyện</FormDescription>
                  <FormControl>
                    <Input placeholder="href" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1 flex justify-center items-center">
              <Button type="submit">Crawl manga</Button>
            </div>
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="type"
              disabled
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Type truyện</FormLabel>
                  <FormDescription>Loại trang web</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Limit truyện</FormLabel>
                  <FormDescription>Giới hạn crawl</FormDescription>
                  <FormControl>
                    <Input placeholder="limit" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
