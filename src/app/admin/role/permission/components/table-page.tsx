"use client";

import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
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
import { deleteRole } from "~/services/role-service";
import { Role, RoleType } from "~/types/role";
import { FetchList } from "~/types/type";
import DialogForm from "./dialog-form";

const columns = columnTable<Role>({
  base: [
    {
      accessorKey: "code",
      header: "Mã quyền",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Tên quyền",
    },
    {
      accessorKey: "type",
      header: "Loại quyền",
      cell: ({ row }) => row.getValue<RoleType>("type").name,
    },
  ],
});

export default function TablePage({ data }: { data?: FetchList<Role> }) {
  const [select, setSelect] = useState<Role>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  async function onDelete(id: string) {
    await deleteRole(id);
  }

  return (
    <DataTable
      dataTable={table}
      columns={columns}
      totalPage={data?.totalPage}
      onSelect={setSelect}
      toolbar={
        <div className="flex items-center gap-2">
          <DialogForm type="post" />
          {select && (
            <div className="flex items-center gap-2">
              <DialogForm type="put" data={select} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Xóa</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Chắc chắn xóa quyền?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Xóa quyền sẽ xóa luôn quyền trong người dùng.
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
