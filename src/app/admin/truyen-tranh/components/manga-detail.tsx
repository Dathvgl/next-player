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
import { MangaDetailAdmin } from "~/types/manga";

const schema = z.object({
  limit: z
    .number()
    .int()
    .min(0)
    .or(z.string())
    .pipe(z.coerce.number().int().min(0)),
});

type FormSchema = z.infer<typeof schema>;

export default function MangaDetail({ manga }: { manga: MangaDetailAdmin }) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { limit: 0 },
  });

  function onSubmit({ limit }: FormSchema) {
    console.log(limit);
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
                    className="no-focus-tw-ring"
                    {...field}
                    type="number"
                    inputMode="numeric"
                    placeholder="Giới hạn"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      e.target.validity.valid && field.onChange(e.target.value);
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
