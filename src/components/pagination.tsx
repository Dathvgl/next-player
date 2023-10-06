"use client";

import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { LinkLIcon } from "./lucide-icon";

interface PaginationProps {
  total: number;
}

export default function Pagination({ total }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const page = Number(searchParams.get("page") ?? 1);

  function handlePage(num: number) {
    if (num == 1) params.delete("page");
    else params.set("page", num.toString());

    const result = params.toString();
    if (!result || result == "") return pathname;
    else return `${pathname}?${params.toString()}`;
  }

  const pages: number[] = [1];
  if (total == 1) return <></>;

  if (total != 1) {
    const result = total - 1;

    if (result == 1) {
      // only one
      pages.push(total);
    } else if (result < 5) {
      // not enough to hide
      for (let index = 1; index < result; index++) {
        pages.push(index + 1);
      }
    } else {
      if (page <= 3) {
        // front page
        for (let index = 1; index <= 3; index++) {
          pages.push(index + 1);
        }

        pages.push(NaN);
        pages.push(total);
      } else if (page >= total - 2) {
        // back page
        pages.push(NaN);

        for (let index = total - 4; index < total; index++) {
          pages.push(index + 1);
        }
      } else {
        // middle page
        pages.push(NaN);

        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);

        pages.push(NaN);
        pages.push(total);
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
            return (
              <li
                key={`${item}-${index}-${pathname}-${searchParams}`}
                className="rounded-full overflow-hidden"
              >
                <LinkLIcon href="" icon={MoreHorizontal} />
              </li>
            );
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
            href={page == total ? "" : handlePage(page + 1)}
            icon={ArrowRight}
          />
        </li>
      </ul>
    </div>
  );
}
