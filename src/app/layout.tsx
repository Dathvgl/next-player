import moment from "moment";
import "moment/locale/vi";
import type { Metadata } from "next";
import { Suspense } from "react";
import NavHeader from "~/app/components/header/nav-header";
import SiteHeader from "~/app/components/header/site-header";
import { NavigationEvents } from "~/components/navigation-event";
import { ScrollArea } from "~/components/ui/scroll-area";
import { siteConfig } from "~/config/site";
import { AuthContextProvider } from "~/contexts/auth-context";
import { fontDancingScript, fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { ChildReact } from "~/types/type";
import ThemeProvider from "./components/theme-provider";
import "./globals.css";

moment.locale("vi");

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: ChildReact) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="root"
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-hidden",
          fontSans.variable,
          fontDancingScript.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContextProvider>
            <div className="flex relative">
              <div id="root-menu-outside">
                <NavHeader />
              </div>
              <ScrollArea className="flex-1 relative h-screen flex flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </ScrollArea>
            </div>
          </AuthContextProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
