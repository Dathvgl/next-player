import { ScrollArea } from "~/components/ui/scroll-area";
import { getMangaAdmin } from "~/services/manga-service";
import { MangaType } from "~/types/manga";
import { ParamReact } from "~/types/type";
import MangaDetail from "./components/manga-detail";
import MangaForm from "./components/manga-form";
import MangaHandle from "./components/manga-handle";
import { numberParam, stringParam } from "~/lib/param";
import Pagination from "~/components/pagination";
import { Metadata } from "next";
import { compactNumber, timeFromNow } from "~/lib/convert";
import Chip from "~/components/chip";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quản trị | Truyện",
};

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
            <ul className="flex flex-col gap-2">
              {data.data.map((item) => (
                <li key={item._id}>
                  <div className="flex justify-between items-center gap-4 p-4 rounded-lg overflow-hidden hover:bg-accent hover:text-accent-foreground">
                    <div className="flex-1 flex flex-col gap-4">
                      <Link
                        className="flex-1"
                        href={`/admin/story/${type}/${item._id}`}
                      >
                        <strong className="line-clamp-2">{item.title}</strong>
                      </Link>
                      <div className="flex">
                        <div className="flex-1">
                          <div>
                            Cập nhật: {timeFromNow(item.lastestUpdated)}
                          </div>
                          <div>Tình trạng: {item.status}</div>
                        </div>
                        <div className="flex-1">
                          <div>Lượt xem: {compactNumber(item.watched)}</div>
                          <div>Theo dõi: {compactNumber(item.followed)}</div>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {item.tags.map((item) => (
                          <Chip key={item._id} text={item.name} />
                        ))}
                      </div>
                    </div>
                    <MangaDetail type={type} manga={item} />
                  </div>
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
