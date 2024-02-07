import { ChildReact } from "~/types/type";
import AuthClientRoute from "./auth-client-route";
import AuthServerRoute from "./auth-server-route";

export async function AuthProtect({
  children,
  filter,
}: ChildReact & { filter?: string[] }) {
  return (
    <AuthServerRoute filter={filter}>
      <AuthClientRoute>
        <>{children}</>
      </AuthClientRoute>
    </AuthServerRoute>
  );
}
