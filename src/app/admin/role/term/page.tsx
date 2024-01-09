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
import { Button } from "~/components/ui/button";
import { useDeleteRoleType, useGetRoleTypes } from "~/services/role-service";
import { RoleType } from "~/types/role";
import DialogForm from "./components/dialog-form";
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

export default function Page() {
  const { data, refetch } = useGetRoleTypes();
  const [deleteRoleType] = useDeleteRoleType();

  const [select, setSelect] = useState<RoleType>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = columnTable<RoleType>({
    base: [{ accessorKey: "name" }],
    name: "Loại role",
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
                        deleteRoleType(select._id)
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
