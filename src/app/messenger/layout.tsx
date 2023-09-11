import PageTransition from "~/components/page-transition";
import { AuthProtectRoute } from "~/components/protect-route";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <AuthProtectRoute>{children}</AuthProtectRoute>
    </PageTransition>
  );
}
