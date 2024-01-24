"use client";

import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  DataTable,
  columnTable,
} from "~/components/data-table/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteUser } from "~/services/user-service";
import { FetchList } from "~/types/type";
import { User } from "~/types/user";
import DialogForm from "./dialog-form";

const columns = columnTable<User>({
  base: [
    { accessorKey: "name", header: "Tên người dùng" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Giới tính" },
    { accessorKey: "birth", header: "Ngày sinh" },
  ],
});

export default function TablePage({ data }: { data?: FetchList<User> }) {
  const [select, setSelect] = useState<User>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  async function onDelete(id: string) {
    await deleteUser(id);
  }

  return (
    <DataTable
      dataTable={table}
      columns={columns}
      totalPage={data?.totalPage}
      onSelect={setSelect}
      toolbar={
        <div className="flex items-center gap-2">
          {select && (
            <div className="flex items-center gap-2">
              <DialogForm type="put" data={select} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Xóa</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Chắc chắn xóa người dùng này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Xóa người dùng sẽ không đăng nhập dữ liệu cũ.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Từ chối</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(select._id)}>
                      Đồng ý
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      }
    />
  );
}
