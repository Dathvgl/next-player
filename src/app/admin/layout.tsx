import dynamic from "next/dynamic";
import Link from "next/link";
import { customIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import NavSide from "~/components/nav-side";
import PageTransition from "~/components/page-transition";
import { AuthProtect } from "~/components/protect-route";
import { ScrollArea } from "~/components/ui/scroll-area";
import { siteConfig } from "~/configs/site";
import { ChildReact } from "~/types/type";
import ThemeToggle from "../components/header/theme-toggle";
import SideLink from "./components/side-link";

const UserSign = dynamic(() => import("../components/header/user-sign"), {
  ssr: false,
});

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <AuthProtect>
        <div className="flex">
          <ScrollArea className="w-1/5 h-screen max-md:hidden">
            <Link
              className="flex items-center space-x-2 h-16 border-b px-4"
              href="/"
            >
              <LIcon icon={customIcons.logo} className="h-6 w-6" />
              <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
            <SideLink />
          </ScrollArea>
          <div className="w-4/5 max-md:w-full border-l">
            <header className="border-b">
              <div className="container flex h-16 items-center space-x-4 max-md:justify-between md:justify-end sm:space-x-0">
                <NavSide admin />
                <div className="flex flex-1 items-center justify-end space-x-4">
                  <ThemeToggle />
                  <UserSign />
                </div>
              </div>
            </header>
            <ScrollArea className="p-4 h-[calc(100vh-var(--height-header-body))]">
              {children}
            </ScrollArea>
          </div>
        </div>
      </AuthProtect>
    </PageTransition>
  );
}
