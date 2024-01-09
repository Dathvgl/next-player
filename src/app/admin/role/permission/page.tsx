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
import { DataTable, columnTable } from "~/components/data-table/data-table";
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
import { useGetRoles } from "~/services/role-service";
import { Role, RoleType } from "~/types/role";
import DialogForm from "./components/dialog-form";

export default function Page() {
  const { data, refetch } = useGetRoles();
  const [select, setSelect] = useState<Role>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = columnTable<Role>({
    base: [
      {
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "type",
        header: "Loại quyền",
        cell: ({ row }) => row.getValue<RoleType>("type").name,
      },
    ],
    name: "Tên quyền",
    refetch,
  });

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

  return (
    <DataTable
      dataTable={table}
      columns={columns}
      totalPage={data?.totalPage}
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
                    <AlertDialogAction
                      onClick={() => {
                        // deleteRole(select._id);
                      }}
                    >
                      Đồng ý
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      }
      onSelect={setSelect}
    />
  );
}
