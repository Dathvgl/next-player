import Link from "next/link";
import { Button } from "~/components/ui/button";
import { siteListAdmin } from "~/configs/site";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  return (
    <div className="flex p-4">
      <nav className="basis-1/5">
        <ul className="p-4 flex flex-col gap-2">
          {siteListAdmin.map((item) => (
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
      <div className="basis-4/5">{children}</div>
    </div>
  );
}
