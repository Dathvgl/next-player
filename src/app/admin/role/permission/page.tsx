import { numberParam } from "~/lib/param";
import { getRoles } from "~/services/role-service";
import { ParamReact } from "~/types/type";
import TablePage from "./components/table-page";

export default async function Page({ searchParams }: ParamReact) {
  const page = numberParam({ searchParams, name: "page" });
  const data = await getRoles({ page });
  return <TablePage data={data} />;
}
