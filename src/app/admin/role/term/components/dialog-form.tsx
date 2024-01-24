"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { postRoleType, putRoleType } from "~/services/role-service";
import { RoleType } from "~/types/role";

type DialogFormProps = { type: "post" } | { type: "put"; data: RoleType };

const schema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

type FormSchema = z.infer<typeof schema>;

export default function DialogForm(props: DialogFormProps) {
  const title = props.type == "post" ? "Tạo" : "Sửa";

  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (props.type == "put") {
      form.setValue("code", props.data.code);
      form.setValue("name", props.data.name);
    }
  }, [props.type == "put" ? props.data.name : undefined]);

  async function onSubmit(result: FormSchema) {
    if (props.type == "post") {
      await postRoleType(result);
    } else {
      await putRoleType({ id: props.data._id, data: result });
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Mã loại quyền</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mã loại quyền" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Loại quyền</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Loại quyền" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button variant="outline" type="submit">
                {title}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
