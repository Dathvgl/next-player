import PageTransition from "~/components/page-transition";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  return <PageTransition>{children}</PageTransition>;
}
