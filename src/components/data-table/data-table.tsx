import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import Pagination from "../pagination";
import { Button } from "../ui/button";
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
  name: string;
  sort?: boolean;
  refetch?: () => void;
};

export function columnTable<T>({
  base,
  name,
  sort,
  refetch,
}: ColumnTableProps<T>): ColumnDef<T>[] {
  const column = base.shift();
  if (!column) return [];

  column.header = ({ column }) => {
    return (
      <div className="flex items-center gap-2">
        {refetch && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              refetch();
            }}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
        {sort ? (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            {name}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <span>{name}</span>
        )}
      </div>
    );
  };

  return [column, ...base];
}

type DataTableProps<TData, TValue> = {
  dataTable: TanstackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  totalPage?: number;
  toolbar?: React.ReactNode;
  onSelect?: (value: TData) => void;
};

export function DataTable<TData, TValue>({
  dataTable,
  columns,
  totalPage = 1,
  toolbar,
  onSelect,
}: DataTableProps<TData, TValue>) {
  return (
    <section className="w-full space-y-2.5 overflow-auto">
      <section className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        {toolbar}
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={dataTable} />
        </div>
      </section>
      <section className="rounded-md border">
        <Table>
          <TableHeader>
            {dataTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  onClick={() => {
                    dataTable.toggleAllPageRowsSelected(false);
                    row.toggleSelected(true);
                    onSelect?.(row.original);
                  }}
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
