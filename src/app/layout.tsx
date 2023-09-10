import moment from "moment";
import "moment/locale/vi";
import type { Metadata } from "next";
import SiteHeader from "~/components/home/header/site-header";
import ThemeProvider from "~/components/home/theme-provider";
import { ScrollArea } from "~/components/ui/scroll-area";
import { siteConfig } from "~/config/site";
import { AuthContextProvider } from "~/contexts/auth-context";
import { fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { ChildReact } from "~/types/type";
import "./globals.css";
import NavHeader from "~/components/home/header/nav-header";

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
          fontSans.variable
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
      </body>
    </html>
  );
}
