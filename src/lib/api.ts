const linkExternalApiCrawl = process.env.NEXT_PUBLIC_EXTERNAL_API_CRAWL;

export const externalApi = {
  manga: `${linkExternalApiCrawl}/api/manga`,
  user: `${linkExternalApiCrawl}/api/user`,
};
