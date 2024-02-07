import { redirect } from "next/navigation";
import { getUser } from "~/services/user-service";
import { ChildReact } from "~/types/type";

export default async function AuthServerRoute({
  children,
  filter,
}: ChildReact & { filter?: string[] }) {
  const data = await getUser();

  if (!data) {
    redirect("/");
  }

  return <>{children}</>;
}
