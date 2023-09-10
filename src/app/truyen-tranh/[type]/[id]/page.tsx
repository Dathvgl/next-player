import Chip from "~/components/chip";
import MangaThumnail from "~/components/manga-thumnail";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { externalApi } from "~/lib/api";
import { MangaDetail } from "~/types/manga";
import MangaDetailChapter from "./components/manga-detail-chapter";

interface PageProps {
  params: { type: string; id: string };
}

export default async function Page(props: PageProps) {
  const { type, id } = props.params;

  const res = await fetch(`${externalApi.manga}/detail/${id}?type=${type}`);
  const data: MangaDetail = await res.json();

  return (
    <article className="relative">
      <section className="w-full absolute blur-[6px] z-0">
        <MangaThumnail
          className="w-full h-[200px]"
          fill
          type={type}
          id={id}
          title={data.title}
        />
      </section>
      <section className="px-10 py-10 relative z-20 flex flex-col gap-4">
        <div className="flex max-md:flex-col gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="md:max-w-[40%] rounded-lg overflow-hidden group relative">
                <div className="absolute hidden w-full h-full group-hover:block group-hover:bg-black group-hover:bg-opacity-30" />
                <MangaThumnail
                  className="rounded-lg overflow-hidden"
                  type={type}
                  id={id}
                  title={data.title}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="p-0 [&>button]:hidden">
              <MangaThumnail type={type} id={id} title={data.title} />
            </DialogContent>
          </Dialog>
          <div className="flex-1 flex flex-col gap-2">
            <b className="text-3xl line-clamp-2 text-white md:h-[160px]">
              {data.title}
            </b>
            <div className="pt-2">
              <Button>Theo dõi</Button>
            </div>
          </div>
        </div>
        <section className="flex gap-4">
          {data.tags.map((item) => (
            <Chip key={item._id} text={item.name} />
          ))}
        </section>
        {data.description && <section>{data.description}</section>}
        <section>
          <MangaDetailChapter type={type} id={data._id} />
        </section>
      </section>
    </article>
  );
}
