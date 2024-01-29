import Link from "next/link";
import { customIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { siteConfig, siteList } from "~/configs/site";
import NavSide from "./nav-side";

export default function NavHeader() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-4 items-center">
        <NavSide />
        <Link href="/" className="flex items-center space-x-2 max-md:hidden">
          <LIcon icon={customIcons.logo} className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
      </div>
      <nav className="select-none max-md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer">Apps</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Navigation apps</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {siteList.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link className="cursor-pointer" href={item.path}>
                  <LIcon icon={item.icon} className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
