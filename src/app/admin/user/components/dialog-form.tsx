"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
import { ScrollArea } from "~/components/ui/scroll-area";
import { getRoleAll } from "~/services/role-service";
import { putUserRoles } from "~/services/user-service";
import { Role, RoleType } from "~/types/role";
import { User } from "~/types/user";

type DialogFormProps = { type: "post" } | { type: "put"; data: User };

const schema = z.object({
  roles: z.array(z.string()),
});

type FormSchema = z.infer<typeof schema>;
type ListRole = RoleType & { roles: Omit<Role, "type">[] };

export default function DialogForm(props: DialogFormProps) {
  const title = props.type == "post" ? "Tạo" : "Sửa";

  const [open, setOpen] = useState(false);
  const [list, setList] = useState<ListRole[]>([]);
  const [data, setData] = useState<Role[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { roles: [] },
  });

  useEffect(() => {
    async function init() {
      const data = await getRoleAll();
      if (data) setData(data);
    }

    init();
  }, []);

  useEffect(() => {
    const list: ListRole[] = [];

    if (data) {
      data.forEach(({ type, ...role }) => {
        const index = list.findIndex((item) => item._id == type._id);

        if (index == -1) {
          list.push({ ...type, roles: [role] });
        } else {
          list[index].roles.push(role);
        }
      });
    }

    setList(list);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (props.type == "put") {
      form.setValue(
        "roles",
        props.data.roles.map(({ _id }) => _id)
      );
    }
  }, [props.type == "put" ? props.data.name : undefined]);

  async function onSubmit(result: FormSchema) {
    if (props.type == "post") {
    } else {
      await putUserRoles({ id: props.data._id, data: result });
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
              name="roles"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Quyền lựa chọn</FormLabel>
                  <ScrollArea className="h-24">
                    <div className="flex flex-col gap-4">
                      {list.map((item) => {
                        const real = field.value.filter((child) => {
                          const result = item.roles.find(
                            ({ _id }) => _id == child
                          );
                          return result != undefined;
                        });

                        const filter =
                          real.length == item.roles.length || real.length == 0
                            ? []
                            : item.roles
                                .map(({ _id }) => _id)
                                .filter((child) => {
                                  const result = real.find(
                                    (item) => item == child
                                  );
                                  return result == undefined;
                                });

                        return (
                          <div key={item._id}>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={
                                  filter.length != 0
                                    ? "indeterminate"
                                    : real.length == 0
                                    ? false
                                    : true
                                }
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        ...(filter.length != 0
                                          ? filter
                                          : real.length == 0
                                          ? item.roles.map(({ _id }) => _id)
                                          : []),
                                      ])
                                    : field.onChange(
                                        field.value?.filter((child) => {
                                          const result = item.roles.find(
                                            ({ _id }) => _id == child
                                          );

                                          return result == undefined;
                                        })
                                      );
                                }}
                              />
                              <strong>{item.name}</strong>
                            </div>
                            {item.roles.map((item) => (
                              <FormField
                                key={item._id}
                                control={form.control}
                                name="roles"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item._id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item._id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item._id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== item._id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="capitalize">
                                        {item.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
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
