import { Metadata } from "next";
import dynamic from "next/dynamic";
import PageTransition from "~/components/page-transition";
import Intro from "./components/intro";
import ListSimulation from "./components/list-simulation";

const ChartStat = dynamic(() => import("./components/chart-stat"), {
  ssr: false,
});

const DailyWork = dynamic(() => import("./components/daily-work"), {
  ssr: false,
});

export const metadata: Metadata = { title: "Trang chủ" };

export default function Page() {
  return (
    <PageTransition>
      <section className="px-6 py-4 flex flex-col gap-8">
        <section className="flex md:items-stretch max-md:flex-col gap-8 items-center">
          <ListSimulation />
          <DailyWork />
        </section>
        <section className="flex justify-center">
          <Intro />
        </section>
        <ChartStat />
      </section>
    </PageTransition>
  );
}
