import Link from "next/link";
import PageTransition from "~/components/page-transition";
import { Button } from "~/components/ui/button";
import { ChildReact } from "~/types/type";

const navLinks = [
  {
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Truyện tranh",
    path: "/admin/truyen-tranh",
  },
];

export default function Layout({ children }: ChildReact) {
  return (
    <div className="flex p-4">
      <nav className="basis-1/5">
        <ul className="p-4 flex flex-col gap-2">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link className="block" href={item.path}>
                <Button className="w-full justify-normal" variant="ghost">
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="basis-4/5">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
