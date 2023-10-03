import { toast } from "~/components/ui/use-toast";

export default async function handleFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  text?: boolean
) {
  try {
    if (text) {
      const text = await (await fetch(input, init)).text();

      toast({
        title: "Handle Fetching",
        description: text,
      });
    } else return (await fetch(input, init)).json() as Promise<T>;
  } catch (error: unknown) {
    console.error(error);

    toast({
      title: "Handle Fetching",
      description: "Error while fetching",
    });
  }
}
