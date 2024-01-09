import { MangaType } from "~/types/manga";
import { site } from "./site";

// Manga
const mangaTypes: MangaType[] = ["blogtruyen", "nettruyen"];

export const mangaListType = mangaTypes.map((item) => ({
  type: item,
  icon: `${site.story}/${item}-favicon.png`,
}));

// Music
const musicTypes = ["zingMP3"];

export const musicListType = musicTypes.map((item) => ({
  type: item,
  icon: `${site.music}/${item}-favicon.png`,
}));

// Ecommerce
const ecommerceTypes = ["fake-store-api"];

export const ecommerceListType = ecommerceTypes.map((item) => ({
  type: item,
  icon: `${site.ecommerce}/${item}-favicon.png`,
}));
