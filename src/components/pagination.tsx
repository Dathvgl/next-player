"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { LinkLIcon } from "./lucide-icon";
import { PaginationEllipsis } from "./ui/pagination";

interface PaginationProps {
  totalPage: number;
  disabled?: boolean;
}

export default function Pagination({ totalPage, disabled }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const page = Number(searchParams.get("page") ?? 1);

  function handlePage(num: number) {
    if (disabled) return "";
    if (num == 1) params.delete("page");
    else params.set("page", num.toString());

    const result = params.toString();
    if (!result || result == "") return pathname;
    else return `${pathname}?${params.toString()}`;
  }

  const pages: number[] = [1];
  if (totalPage <= 1) return null;

  if (totalPage != 1) {
    if (totalPage < 5) {
      // not enough to hide
      for (let index = 1; index < totalPage; index++) {
        pages.push(index + 1);
      }
    } else {
      if (page <= 3) {
        // front page
        for (let index = 1; index <= 3; index++) {
          pages.push(index + 1);
        }

        pages.push(NaN);
        pages.push(totalPage);
      } else if (page >= totalPage - 2) {
        // back page
        pages.push(NaN);

        for (let index = totalPage - 4; index < totalPage; index++) {
          pages.push(index + 1);
        }
      } else {
        // middle page
        pages.push(NaN);

        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);

        pages.push(NaN);
        pages.push(totalPage);
      }
    }
  }

  return (
    <div className="flex justify-center">
      <ul className="flex gap-1">
        <li className="rounded-full overflow-hidden">
          <LinkLIcon
            href={page == 1 ? "" : handlePage(page - 1)}
            icon={ArrowLeft}
          />
        </li>
        {pages.map((item, index) => {
          if (isNaN(item)) {
            return <PaginationEllipsis />;
          }

          return (
            <li
              key={`${item}-${index}-${pathname}-${searchParams}`}
              className="rounded-full overflow-hidden"
            >
              <LinkLIcon
                href={item == page ? "" : handlePage(item)}
                active={item == page}
              >
                {item}
              </LinkLIcon>
            </li>
          );
        })}
        <li className="rounded-full overflow-hidden">
          <LinkLIcon
            href={page == totalPage ? "" : handlePage(page + 1)}
            icon={ArrowRight}
          />
        </li>
      </ul>
    </div>
  );
}
