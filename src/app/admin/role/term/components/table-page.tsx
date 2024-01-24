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
import { deleteRoleType } from "~/services/role-service";
import { RoleType } from "~/types/role";
import { FetchList } from "~/types/type";
import DialogForm from "./dialog-form";

const columns = columnTable<RoleType>({
  base: [
    {
      accessorKey: "code",
      header: "Mã loại quyền",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("code")}</div>
      ),
    },
    { accessorKey: "name", header: "Loại quyền" },
  ],
});

export default function TablePage({ data }: { data?: FetchList<RoleType> }) {
  const [select, setSelect] = useState<RoleType>();
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
    await deleteRoleType(id);
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
                    <AlertDialogTitle>
                      Chắc chắn xóa loại quyền?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Xóa loại quyền sẽ xóa luôn các quyền thuộc loại này.
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
