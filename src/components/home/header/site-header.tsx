import { Twitter } from "lucide-react";
import Link from "next/link";
import LIcon from "~/components/lucide-icon";
import { siteConfig } from "~/config/site";
import { CustomIcons } from "../../custom-icons";
import ThemeToggle from "./theme-toggle";
import UserSign from "./user-sign";

export default function SiteHeader() {
  return (
    <header className="bg-background w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              className="rounded-full overflow-hidden"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <LIcon className="w-5 h-5" icon={CustomIcons.gitHub} button />
            </Link>
            <Link
              className="rounded-full overflow-hidden"
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <LIcon className="w-5 h-5 fill-current" icon={Twitter} button />
            </Link>
            <ThemeToggle />
            <UserSign />
          </nav>
        </div>
      </div>
    </header>
  );
}
