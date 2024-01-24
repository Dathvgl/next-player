"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Chip from "~/components/chip";
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
import { compactNumber, timeFromNow } from "~/lib/convert";
import { zInt } from "~/lib/zod";
import { postMangaAdmin } from "~/services/manga-service";
import { MangaDetailAdmin, MangaType } from "~/types/manga";

const schema = z.object({
  limit: zInt,
});

type FormSchema = z.infer<typeof schema>;

type MangaDetailProps = {
  type: MangaType;
  manga: MangaDetailAdmin;
};

export default function MangaDetail({ type, manga }: MangaDetailProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { limit: 0 },
  });

  async function onSubmit({ limit }: FormSchema) {
    await postMangaAdmin({ limit, href: manga.href, type: type });
  }

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <strong className="flex-1 line-clamp-2">{manga.title}</strong>
        <div className="flex">
          <div className="flex-1">
            <div>Cập nhật: {timeFromNow(manga.lastestUpdated)}</div>
            <div>Tình trạng: {manga.status}</div>
          </div>
          <div className="flex-1">
            <div>Lượt xem: {compactNumber(manga.watched)}</div>
            <div>Theo dõi: {compactNumber(manga.followed)}</div>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {manga.tags.map((item) => (
            <Chip key={item._id} text={item.name} />
          ))}
        </div>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-32"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    placeholder="Giới hạn"
                    pattern="[0-9]*"
                    onChange={(event) => {
                      event.target.validity.valid &&
                        field.onChange(event.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Cập nhật</Button>
        </form>
      </Form>
    </div>
  );
}
