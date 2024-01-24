import { numberParam } from "~/lib/param";
import { getRoleTypes } from "~/services/role-service";
import { ParamReact } from "~/types/type";
import TablePage from "./components/table-page";

export default async function Page({ searchParams }: ParamReact) {
  const page = numberParam({ searchParams, name: "page" });
  const data = await getRoleTypes({ page });
  return <TablePage data={data} />;
}
