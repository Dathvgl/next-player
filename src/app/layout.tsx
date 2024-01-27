import moment from "moment";
import "moment/locale/vi";
import type { Metadata } from "next";
import { Suspense } from "react";
import HandleProvider from "~/components/handle-provider/handle-provider";
import { NavigationEvents } from "~/components/navigation-event";
import { Toaster } from "~/components/ui/sonner";
import { siteConfig } from "~/configs/site";
import { fontDancingScript, fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { ChildReact } from "~/types/type";
import "./globals.css";

moment.locale("vi");

export const revalidate = 60;

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
        <HandleProvider>
          <>{children}</>
        </HandleProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
