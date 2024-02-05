const linkApiCrawl = process.env.NEXT_PUBLIC_EXTERNAL_API_CRAWL;

export const linkApi = {
  base: `${linkApiCrawl}`,
  role: `${linkApiCrawl}/api/role`,
  user: `${linkApiCrawl}/api/user`,
  manga: `${linkApiCrawl}/api/manga`,
  music: `${linkApiCrawl}/api/music`,
};
