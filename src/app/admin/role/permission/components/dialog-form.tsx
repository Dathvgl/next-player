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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getRoleTypeAll, postRole, putRole } from "~/services/role-service";
import { Role, RoleType } from "~/types/role";

type DialogFormProps = { type: "post" } | { type: "put"; data: Role };

const schema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
  type: z.string(),
});

type FormSchema = z.infer<typeof schema>;

export default function DialogForm(props: DialogFormProps) {
  const title = props.type == "post" ? "Tạo" : "Sửa";

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RoleType[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { code: "", name: "" },
  });

  useEffect(() => {
    async function init() {
      const data = await getRoleTypeAll();
      if (data) setData(data);
    }

    init();
  }, []);

  useEffect(() => {
    if (props.type == "put") {
      form.setValue("code", props.data.code);
      form.setValue("name", props.data.name);
      form.setValue("type", props.data.type._id);
    }
  }, [props.type == "put" ? props.data.name : undefined]);

  async function onSubmit(result: FormSchema) {
    if (props.type == "post") {
      await postRole(result);
    } else {
      await putRole({ id: props.data._id, data: result });
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
                  <FormLabel>Mã quyền</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Mã quyền"
                      onChange={(e) => {
                        e.target.validity.valid &&
                          field.onChange(e.target.value);
                      }}
                    />
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
                  <FormLabel>Tên quyền</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Tên quyền"
                      onChange={(e) => {
                        e.target.validity.valid &&
                          field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Loại quyền</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại quyền" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        <SelectGroup>
                          {data.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
