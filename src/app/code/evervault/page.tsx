import { Metadata } from "next";
import Evervault from "~/components/evervault";

export const metadata: Metadata = {
  title: "Evervault là gì thế... 🤣",
};

export default function Page() {
  return (
    <div className="h-[calc(100vh-65px)]">
      <Evervault />
    </div>
  );
}
