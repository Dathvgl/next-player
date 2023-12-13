import Link from "next/link";
import PageTransition from "~/components/page-transition";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  return (
    <div className="flex">
      <nav>
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/truyen-tranh">Truyện tranh</Link>
          </li>
        </ul>
      </nav>
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
