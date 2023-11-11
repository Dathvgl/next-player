import handleFetch from "~/lib/fetch";

const baseUrl = "https://youtube-v31.p.rapidapi.com";

async function handleFetchYoutube<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  text?: boolean
) {
  return await handleFetch<T>(
    input,
    {
      ...init,
      headers: {
        "X-RapidAPI-Key": "7253185ae3msh7a0e98252743b11p15601ajsn4e00662b1904",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    },
    text
  );
}

export async function youtubeSearch() {
  return await handleFetchYoutube(`${baseUrl}/search?part=snippet,id`);
}
