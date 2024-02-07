import PageTransition from "~/components/page-transition";
import { AuthProtect } from "~/components/protect-route/protect-route";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <AuthProtect>{children}</AuthProtect>
    </PageTransition>
  );
}
