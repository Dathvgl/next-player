import moment from "moment";
import "moment/locale/vi";
import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "~/app/components/header/site-header";
import { NavigationEvents } from "~/components/navigation-event";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Toaster } from "~/components/ui/toaster";
import { siteConfig } from "~/config/site";
import { AuthContextProvider } from "~/contexts/auth-context";
import { fontDancingScript, fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { ReduxProvider } from "~/redux/provider";
import { ChildReact } from "~/types/type";
import NavSide from "./components/header/nav-side";
import ThemeProvider from "./components/theme-provider";
import "./globals.css";

moment.locale("vi");

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          <ReduxProvider>
            <AuthContextProvider>
              <main className="flex relative">
                <NavSide />
                <ScrollArea className="flex-1 relative h-screen flex flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </ScrollArea>
              </main>
            </AuthContextProvider>
          </ReduxProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
