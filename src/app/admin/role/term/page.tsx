import { numberParam } from "~/lib/param";
import { getRoleTypes } from "~/services/role-service";
import { ParamReact } from "~/types/type";
import TablePage from "./components/table-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị | Loại quyền",
};

export default async function Page({ searchParams }: ParamReact) {
  const page = numberParam({ searchParams, name: "page" });
  const data = await getRoleTypes({ page });
  return <TablePage data={data} />;
}
