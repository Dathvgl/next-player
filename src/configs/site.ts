import {
  Aperture,
  BookIcon,
  Code2,
  HomeIcon,
  LucideIcon,
  MessageCircle,
  Music4Icon,
  ShoppingBag,
  Users,
} from "lucide-react";
import { WebLink, WebLinkAdmin } from "~/types/type";

export const siteConfig = {
  name: "fsfssfssfsfsfs",
  description:
    "Một trang web cơ bản chứa những chức năng mà người tạo muốn tích vào",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};

export type SiteLink<T> = {
  name: string;
  path: string;
  alt: T;
  icon: LucideIcon;
};

// Client route
type Site = keyof typeof siteNavigate;

export const siteNavigate: Record<WebLink, SiteLink<WebLink>> = {
  home: {
    name: "Trang chủ",
    path: "/",
    alt: "home",
    icon: HomeIcon,
  },
  story: {
    name: "Truyện tranh",
    path: "/story",
    alt: "story",
    icon: BookIcon,
  },
  message: {
    name: "Tin nhắn",
    path: "/message",
    alt: "message",
    icon: MessageCircle,
  },
  music: {
    name: "Nghe nhạc",
    path: "/music",
    alt: "music",
    icon: Music4Icon,
  },
  ecommerce: {
    name: "Thương mại điện tử",
    path: "/ecommerce",
    alt: "ecommerce",
    icon: ShoppingBag,
  },
  code: {
    name: "Code",
    path: "/code",
    alt: "code",
    icon: Code2,
  },
};

function handle() {
  return Object.keys(siteNavigate).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: siteNavigate[curr as Site].path,
    }),
    {}
  ) as Record<WebLink, string>;
}

export const site = handle();

export const siteList = Object.keys(siteNavigate).map((key) => {
  return siteNavigate[key as Site];
});

// Admin route
type SiteAdmin = keyof typeof siteNavigateAdmin;

export const siteNavigateAdmin: Record<WebLinkAdmin, SiteLink<WebLinkAdmin>> = {
  home: {
    name: "Tổng quan",
    path: "/admin",
    alt: "home",
    icon: HomeIcon,
  },
  role: {
    name: "Quyền hạn",
    path: "/admin/role",
    alt: "role",
    icon: Aperture,
  },
  user: {
    name: "Người dùng",
    path: "/admin/user",
    alt: "user",
    icon: Users,
  },
  story: {
    name: "Truyện tranh",
    path: "/admin/story",
    alt: "story",
    icon: BookIcon,
  },
  ecommerce: {
    name: "Thương mại điện tử",
    path: "/admin/ecommerce",
    alt: "ecommerce",
    icon: ShoppingBag,
  },
};

function handleAdmin() {
  return Object.keys(siteNavigateAdmin).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: siteNavigateAdmin[curr as SiteAdmin].path,
    }),
    {}
  ) as Record<WebLinkAdmin, string>;
}

export const siteAdmin = handleAdmin();

export const siteListAdmin = Object.keys(siteNavigateAdmin).map((key) => {
  return siteNavigateAdmin[key as SiteAdmin];
});
