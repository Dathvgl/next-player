import { Menu, X } from "lucide-react";
import Link from "next/link";
import { CustomIcons } from "~/components/custom-icons";
import CustomInput from "~/components/custom-input";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { dropLinks, siteConfig } from "~/config/site";
import { MotionDiv, MotionLi } from "~/lib/motion";

export default function NavHeader() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-4 items-center">
        <CustomInput type="radio" name="root-menu-header" value="open">
          <LIcon className="w-5 h-5" icon={Menu} button />
        </CustomInput>
        <Link href="/" className="flex items-center space-x-2 root-menu-header">
          <LIcon icon={CustomIcons.logo} className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
      </div>
      <nav className="select-none root-menu-header">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer">Apps</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Navigation apps</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dropLinks.map((item) => (
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
