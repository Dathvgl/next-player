import { ExternalToast, toast } from "sonner";

type HandleFetchProps = {
  url: RequestInfo | URL;
  init?: RequestInit | undefined;
  sonner?: {
    title?: string;
    data?: ExternalToast | undefined;
  };
};

export default async function handleFetch<T>({
  url,
  init,
  sonner,
}: HandleFetchProps) {
  const res = await fetch(url, init);

  if (res.status >= 300) {
    const { message } = (await res.json()) as { message: string };

    if (sonner) {
      toast(sonner.title, {
        ...sonner.data,
        description: sonner.data?.description ?? message,
      });
    }

    return;
  }

  const response = await res.json();
  const { message } = response as { message?: string };

  if (message) {
    if (sonner) {
      toast(sonner.title, {
        ...sonner.data,
        description: sonner.data?.description ?? message,
      });
    }
  }

  return response as T;
}
