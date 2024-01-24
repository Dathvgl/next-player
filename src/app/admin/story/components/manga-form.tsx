"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { zInt } from "~/lib/zod";
import { postMangaAdmin } from "~/services/manga-service";
import { MangaType } from "~/types/manga";

const schema = z.object({
  href: z.string().trim(),
  type: z.string().trim(),
  limit: zInt,
});

export default function MangaForm({ type }: { type: MangaType }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: { href: "", type, limit: 0 },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await postMangaAdmin(values);
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
                <FormItem className="flex-1 form-item">
                  <FormLabel>Href truyện</FormLabel>
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
                <FormItem className="flex-1 form-item">
                  <FormLabel>Type truyện</FormLabel>
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
                <FormItem className="flex-1 form-item">
                  <FormLabel>Limit truyện</FormLabel>
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
