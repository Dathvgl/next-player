import { Suspense } from "react";
import ZingMP3Wrapper from "~/app/music/zingMP3/components/zing-mp3-wrapper";
import PageTransition from "~/components/page-transition";
import { ChildReact } from "~/types/type";
import ZingMP3Empty from "./components/zing-mp3-empty";

export default function Layout({ children }: ChildReact) {
  return (
    <PageTransition>
      <Suspense>
        <ZingMP3Wrapper>
          {children}
          <ZingMP3Empty />
        </ZingMP3Wrapper>
      </Suspense>
    </PageTransition>
  );
}
