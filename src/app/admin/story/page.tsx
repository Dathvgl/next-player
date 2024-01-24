import { ScrollArea } from "~/components/ui/scroll-area";
import { getMangaAdmin } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import MangaDetail from "./components/manga-detail";
import MangaForm from "./components/manga-form";
import MangaHandle from "./components/manga-handle";
import { numberParam, stringParam } from "~/lib/param";
import Pagination from "~/components/pagination";

export default async function Page({ searchParams }: ParamReact) {
  const page = numberParam({ searchParams, name: "page" });

  const type = stringParam({
    searchParams,
    name: "type",
    base: "nettruyen",
  }) as MangaType;

  const data = await getMangaAdmin({ page, type });

  return (
    <section className="flex flex-col gap-4">
      <section className="flex p-4 gap-4 rounded-lg border border-solid border-black dark:border-white">
        <MangaHandle type={type} />
        <MangaForm type={type} />
      </section>
      {data && (
        <section className="flex flex-col gap-2">
          <ScrollArea className="h-[300px]">
            <ul className="flex flex-col gap-8">
              {data.data.map((item) => (
                <li key={item._id}>
                  <MangaDetail type={type} manga={item} />
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Pagination totalPage={data.totalPage} />
        </section>
      )}
    </section>
  );
}
