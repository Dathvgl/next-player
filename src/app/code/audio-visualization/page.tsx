import { Metadata } from "next";
import AudioVisualization from "../components/audio-visualization";

export const metadata: Metadata = {
  title: "Audio visualization 🤡",
};

export default function Page() {
  return (
    <div className="h-[calc(100vh-65px)]">
      <AudioVisualization />
    </div>
  );
}
