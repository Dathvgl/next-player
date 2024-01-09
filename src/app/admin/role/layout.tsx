import PageTransition from "~/components/page-transition";
import { ChildReact } from "~/types/type";
import Navigate from "./components/navigate";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <div className="flex flex-col gap-2">
        <Navigate />
        <section>{children}</section>
      </div>
    </PageTransition>
  );
}
