import { Menu } from "lucide-react";
import Link from "next/link";
import { CustomIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { siteConfig } from "~/configs/site";
import NavSideLink from "./nav-side-link";

export default function NavSide() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-[280px]" side="left">
        <nav id="root-menu" className="select-none">
          <Link
            href="/"
            className="flex items-center space-x-2 h-16 border-b px-4"
          >
            <LIcon icon={CustomIcons.logo} className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <NavSideLink />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
