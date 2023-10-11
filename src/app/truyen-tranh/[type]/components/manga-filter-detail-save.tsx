"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "~/redux/hook";

export function MangaFilterDetailSave() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  return (
    <MangaFilterDetailSaveBody
      router={router}
      pathname={pathname}
      params={params}
    />
  );
}

interface MangaFilterDetailSaveBodyProps {
  router: AppRouterInstance;
  pathname: string;
  params: URLSearchParams;
}

function MangaFilterDetailSaveBody(props: MangaFilterDetailSaveBodyProps) {
  const { router, pathname, params } = props;
  const filter = useAppSelector((state) => state.manga.filter);

  function onSave() {
    const order = params.get("order");
    const sort = params.get("sort");

    const includes = params.getAll("includes");
    const excludes = params.getAll("excludes");

    let check = false;
    if (filter.includes.length == 0 && includes.length != 0) {
      check = true;
      params.delete("includes");
    } else {
      const array = includes.sort();
      const list = [...filter.includes].sort();

      if (JSON.stringify(array) != JSON.stringify(list)) {
        check = true;
        params.delete("includes");
        list.forEach((item) => {
          params.append("includes", item);
        });
      }
    }

    if (filter.excludes.length == 0 && excludes.length != 0) {
      check = true;
      params.delete("excludes");
    } else {
      const array = excludes.sort();
      const list = [...filter.excludes].sort();

      if (JSON.stringify(array) != JSON.stringify(list)) {
        check = true;
        params.delete("excludes");
        list.forEach((item) => {
          params.append("excludes", item);
        });
      }
    }

    if (filter.order != order) {
      check = true;
      if (filter.order != "desc") {
        params.set("order", filter.order);
      } else params.delete("order");
    }

    if (filter.sort != sort) {
      check = true;
      if (filter.sort != "lastest") {
        params.set("sort", filter.sort);
      } else params.delete("sort");
    }

    if (check) {
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }
  }

  return <DialogClose onClick={onSave}>Save</DialogClose>;
}
