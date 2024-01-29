"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomImage } from "~/components/custom-image/custom-image";
import CustomImageInput from "~/components/custom-image/custom-image-input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { cleanObject } from "~/lib/convert";
import { MangaDetail } from "~/types/manga";

type DialogFormProps = { data: MangaDetail & { src: string } };

const schema = z.object({
  title: z.string().trim().min(1),
  altTitle: z.string().trim().optional(),
  status: z.string().trim(),
  description: z.string().trim().optional(),
});

type FormSchema = z.infer<typeof schema>;

export default function DialogForm({ data }: DialogFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const { title, altTitle, status, description } = data;

    const obj = { title, altTitle, status, description };

    for (const [key, value] of Object.entries(obj)) {
      form.setValue(
        key as keyof FormSchema,
        typeof value == "string" ||
          typeof value == "object" ||
          typeof value == "undefined"
          ? value ?? ""
          : typeof value == "number"
          ? value ?? 0
          : value
      );
    }
  }, []);

  async function onSubmit(result: FormSchema) {
    const obj: Partial<FormSchema> = cleanObject(data, result);
    // await ({ id: props.data._id, data: result });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Save className="mr-2 w-4 h-4" /> Cập nhật
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[640px] flex flex-col gap-3"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Cập nhật</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-2 justify-between">
              <CustomImage
                className="rounded-lg overflow-hidden flex-1 h-36"
                fill
                src={data.src}
                alt={data.title}
                objectFit="cover"
              />
              <div className="rounded-lg overflow-hidden border-2 border-dashed border-white p-2 flex-1 h-36">
                <CustomImageInput
                  className="rounded-lg overflow-hidden"
                  src={data.src}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Tên truyện</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Tên truyện" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altTitle"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Tên khác</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Tên khác" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Trạng thái" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Nội dung" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button variant="outline" type="submit">
                Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
