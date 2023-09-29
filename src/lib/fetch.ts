import { toast } from "~/components/ui/use-toast";

export default async function handleFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  try {
    return (await fetch(input, init)).json() as Promise<T>;
  } catch (error: unknown) {
    console.error(error);

    toast({
      title: "Handle Fetching",
      description: "Error while fetching",
    });
  }
}
