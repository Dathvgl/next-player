import { Metadata } from "next";
import { externalApi } from "~/lib/api";
import { capitalize } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { MangaTag } from "~/types/manga";
import MangaFilter from "./components/manga-filter";
import MangaList from "./components/manga-list";

interface PageProps {
  params: { type: string };
  searchParams: Record<string, unknown>;
}

export async function generateMetadata({
  params: { type },
  searchParams,
}: PageProps): Promise<Metadata> {
  const keys = Object.keys(searchParams);
  if (keys.length == 0) {
    return { title: `${capitalize(type)} | Descending | Lastest` };
  } else {
    const data = await handleFetch<{ data: MangaTag[] }>(
      `${externalApi.manga}/tag?type=${type}`
    );

    let str = "";

    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value == "string") {
        if (!value || value == "") continue;
      }

      if (Array.isArray(value)) {
        const length = value.length;
        if (!data) continue;
        str += ` | ${capitalize(key)} `;

        for (let index = 0; index < length; index++) {
          const result = data.data.find(({ _id }) => _id == value[index]);
          if (!result) continue;
          str += `${index == 0 ? "" : "-"}${result.name}`;
        }
      } else {
        if (key == "order") {
          str += ` | ${value == "asc" ? "Ascending" : "Descending"}`;
        } else if (key == "sort") {
          str += ` | ${capitalize(value as string)}`;
        } else if (key == "includes" || key == "excludes") {
          if (!data) continue;
          const result = data.data.find(({ _id }) => _id == value);
          if (!result) continue;
          str += ` | ${capitalize(key)}: ${result.name}`;
        } else if (key == "page") continue;
        else str += ` | ${value}`;
      }
    }

    if (!Object.hasOwn(searchParams, "order")) {
      str += " | Descending";
    }

    if (!Object.hasOwn(searchParams, "sort")) {
      str += " | Lastest";
    }

    if (Object.hasOwn(searchParams, "page")) {
      str += ` | Page ${searchParams.page}`;
    }

    return { title: `${capitalize(type)}${str}` };
  }
}

export default async function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  const data = await handleFetch<{ data: MangaTag[] }>(
    `${externalApi.manga}/tag?type=${type}`
  );

  return (
    <section className="flex flex-col gap-4 mt-4">
      <MangaFilter list={data?.data} />
      <section className="flex gap-4">
        <div className="flex-1">
          <MangaList type={type} />
        </div>
      </section>
    </section>
  );
}
