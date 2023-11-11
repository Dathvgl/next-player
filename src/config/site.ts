import {
  BookIcon,
  Code2,
  HomeIcon,
  LucideIcon,
  MessageCircle,
  Music4Icon,
  ShoppingBag,
} from "lucide-react";
import { WebLinkType } from "~/types/type";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};

interface NavLinkProps {
  name: string;
  path: string;
  alt: WebLinkType;
  icon: LucideIcon;
}

export const navLinks: NavLinkProps[] = [
  {
    name: "Trang chủ",
    path: "/",
    alt: "home",
    icon: HomeIcon,
  },
  {
    name: "Truyện tranh",
    path: "/truyen-tranh",
    alt: "manga",
    icon: BookIcon,
  },
  {
    name: "Messenger",
    path: "/messenger",
    alt: "message",
    icon: MessageCircle,
  },
  {
    name: "Nghe nhạc",
    path: "/music",
    alt: "music",
    icon: Music4Icon,
  },
  {
    name: "Ecommerce",
    path: "/ecommerce",
    alt: "ecommerce",
    icon: ShoppingBag,
  },
  {
    name: "Code",
    path: "/code",
    alt: "code",
    icon: Code2,
  },
];
