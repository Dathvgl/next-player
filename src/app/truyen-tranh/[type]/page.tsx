import { capitalize } from "~/lib/convert";
import MangaList from "./components/manga-list";
import MangaFilter from "./components/manga-filter";
import handleFetch from "~/lib/fetch";
import { externalApi } from "~/lib/api";
import { MangaTag } from "~/types/manga";

interface PageProps {
  params: { type: string };
}

export function generateMetadata({ params: { type } }: PageProps) {
  return { title: capitalize(type) };
}

export default async function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  const data = await handleFetch<{ data: MangaTag[] }>(
    `${externalApi.manga}/tag?type=${type}`
  );

  return (
    <div className="flex flex-col gap-4 mt-4">
      <MangaFilter list={data?.data} />
      <div className="flex gap-4">
        <div className="flex-1">
          <MangaList type={type} />
        </div>
      </div>
    </div>
  );
}
