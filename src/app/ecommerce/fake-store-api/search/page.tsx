import { Metadata } from "next";
import { ParamReact } from "~/types/type";
import SearchList from "./components/search-list";

export async function generateMetadata({
  searchParams: { filter },
}: ParamReact): Promise<Metadata> {
  return { title: `Searching ${filter}` };
}

export default function Page({ searchParams: { filter } }: ParamReact) {
  if (typeof filter != "string") return null;
  return <SearchList filter={filter} />;
}
