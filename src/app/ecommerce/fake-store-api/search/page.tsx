import SearchList from "./components/search-list";

interface PageProps {
  searchParams: { filter: string };
}

export async function generateMetadata({
  searchParams: { filter },
}: PageProps) {
  return { title: `Searching ${filter}` };
}

export default function Page({ searchParams: { filter } }: PageProps) {
  return <SearchList filter={filter} />;
}
