"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DataTablePaginationProps = {
  pageSizes?: number[];
};

export function DataTablePagination({
  pageSizes = [5, 10, 20, 30, 40, 50],
}: DataTablePaginationProps) {
  const [pageSize, setPageSizes] = useState(pageSizes[0]);

  return (
    <section className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap text-sm font-medium">Hiển thị</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSizes(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizes.map((item) => (
                <SelectItem key={item} value={`${item}`}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination className="[&_a>span]:hidden">
          <PaginationContent>
            <PaginationPrevious href="/" />
            <PaginationLink href="#">1</PaginationLink>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
            <PaginationLink href="#">3</PaginationLink>
            <PaginationEllipsis />
            <PaginationNext href="#" />
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
