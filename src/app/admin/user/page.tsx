import { numberParam } from "~/lib/param";
import { getUsers } from "~/services/user-service";
import { ParamReact } from "~/types/type";
import TablePage from "./components/table-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị | Người dùng",
};

export default async function Page({ searchParams }: ParamReact) {
  const page = numberParam({ searchParams, name: "page" });
  const data = await getUsers({ page });
  return <TablePage data={data} />;
}
