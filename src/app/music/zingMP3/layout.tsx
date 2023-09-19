import PageTransition from "~/components/page-transition";
import { ZingMP3ContextProvider } from "~/contexts/zing-mp3-context";
import { ChildReact } from "~/types/type";
import ZingMP3Empty from "./components/zing-mp3-empty";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <ZingMP3ContextProvider>
        {children}
        <ZingMP3Empty />
      </ZingMP3ContextProvider>
    </PageTransition>
  );
}
