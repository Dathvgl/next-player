import {
  Dancing_Script,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-mono",
});

export const fontDancingScript = Dancing_Script({
  subsets: ["vietnamese"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-dancing-script",
});
