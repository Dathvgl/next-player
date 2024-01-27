import { ScrollArea } from "~/components/ui/scroll-area";
import { ChildReact } from "~/types/type";
import ThemeToggle from "../components/header/theme-toggle";
import UserSign from "../components/header/user-sign";
import SideLink from "./components/side-link";

export default function Layout({ children }: ChildReact) {
  return (
    <div className="flex">
      <SideLink />
      <div className="w-4/5 border-l">
        <header className="border-b">
          <div className="container flex h-16 items-center space-x-4 sm:justify-end sm:space-x-0">
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <UserSign />
              </nav>
            </div>
          </div>
        </header>
        <ScrollArea className="p-4 h-[calc(100vh-var(--height-header-body))]">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
