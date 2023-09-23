import PageTransition from "~/components/page-transition";
import { ZingMP3ContextProvider } from "~/contexts/zing-mp3-context";
import { ChildReact } from "~/types/type";
import ZingMP3Empty from "./components/zing-mp3-empty";
import { Suspense } from "react";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <Suspense>
        <ZingMP3ContextProvider>
          {children}
          <ZingMP3Empty />
        </ZingMP3ContextProvider>
      </Suspense>
    </PageTransition>
  );
}
