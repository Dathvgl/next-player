import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { RotateCcw } from "lucide-react";
import { cn } from "~/lib/utils";
import Pagination from "../pagination";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTableViewOptions } from "./data-table-view-options";

type ColumnTableProps<T> = {
  base: ColumnDef<T>[];
  radio?: {
    head?: boolean;
    ceil: boolean;
    onClick?: () => void;
    options?: Omit<ColumnDef<T>, "id" | "header" | "cell">;
  };
  checkbox?: {
    ceil: boolean;
    options?: Omit<ColumnDef<T>, "id" | "header" | "cell">;
  };
};

export function columnTable<T>({
  base,
  radio,
  checkbox,
}: ColumnTableProps<T>): ColumnDef<T>[] {
  if (!radio && !checkbox) return base;

  if (radio) {
    const list: ColumnDef<T>[] = [
      {
        id: "radio",
        header: ({ table }) => {
          return radio?.head ? (
            <span
              onClick={() => {
                table.resetRowSelection();
                radio.onClick?.();
              }}
            >
              <RotateCcw className="w-4 h-4 hover:scale-110 hover:rotate-180 transition-all duration-1000 cursor-pointer" />
            </span>
          ) : null;
        },
        cell: ({ row, table }) => (
          <Input
            className="w-4 h-3 m-auto p-0 transition-all"
            type="radio"
            name="radioSelect"
            defaultChecked={row.getIsSelected()}
            onClick={() => {
              if (!row.getIsSelected()) {
                table.resetRowSelection();
                row.toggleSelected(true);
              }
            }}
          />
        ),
        ...radio.options,
      },
      ...base,
    ];

    return list;
  }

  if (checkbox) {
    const list: ColumnDef<T>[] = [
      {
        id: "checkbox",
        header: ({ table }) => {
          return (
            <Checkbox
              className="translate-y-[2px]"
              aria-label="Select all"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value);
              }}
            />
          );
        },
        cell: ({ row }) => (
          <Checkbox
            className="translate-y-[2px]"
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        ...checkbox.options,
      },
      ...base,
    ];

    return list;
  }

  return base;
}

type DataTableProps<TData, TValue> = {
  dataTable: TanstackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  totalPage?: number;
  toolbar?: React.ReactNode;
  onSelect?: (value: TData) => void;
  onChecked?: (value: TData[]) => void;
};

export function DataTable<TData, TValue>({
  dataTable,
  columns,
  totalPage = 1,
  toolbar,
  onSelect,
  onChecked,
}: DataTableProps<TData, TValue>) {
  return (
    <section className="w-full space-y-2.5">
      <section className="flex w-full items-center justify-between space-x-2">
        {toolbar}
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={dataTable} />
        </div>
      </section>
      <section className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className="whitespace-nowrap">
            {dataTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "",
                        header.id == "radio" && "w-[16px]",
                        header.id == "checkbox" && "w-[32px]"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {dataTable.getRowModel().rows.length != 0 ? (
              dataTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={
                    !onSelect && !onChecked
                      ? undefined
                      : () => {
                          if (onSelect) {
                            dataTable.toggleAllPageRowsSelected(false);
                            onSelect?.(row.original);
                          }

                          row.toggleSelected(true);
                        }
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      <Pagination totalPage={totalPage} />
    </section>
  );
}
