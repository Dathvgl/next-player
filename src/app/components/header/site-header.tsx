import NavHeader from "./nav-header";
import ThemeToggle from "./theme-toggle";
import UserSign from "./user-sign";

export default function SiteHeader() {
  return (
    <header className="bg-background w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavHeader />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserSign />
          </nav>
        </div>
      </div>
    </header>
  );
}
