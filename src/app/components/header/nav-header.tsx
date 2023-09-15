import { BookIcon, HomeIcon, LucideIcon, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import CustomCheckbox from "~/components/custom-checkbox";
import { CustomIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { siteConfig } from "~/config/site";

interface DropLinkProps {
  name: string;
  path: string;
  icon: LucideIcon;
}

const dropLinks: DropLinkProps[] = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Truyện tranh",
    path: "/truyen-tranh",
    icon: BookIcon,
  },
  {
    name: "Messenger",
    path: "/messenger",
    icon: MessageCircle,
  },
];

export default function NavHeader() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-4 items-center">
        <CustomCheckbox id="root-menu-header" className="w-10 h-10">
          <LIcon className="w-5 h-5" icon={Menu} button />
        </CustomCheckbox>
        <Link href="/" className="flex items-center space-x-2">
          <LIcon icon={CustomIcons.logo} className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
      </div>
      <nav className="select-none">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </div>
  );
}
