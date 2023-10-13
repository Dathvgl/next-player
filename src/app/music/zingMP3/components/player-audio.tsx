import { Shuffle, SkipBack, SkipForward } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import AudioTimeline from "./audio-timeline";
import PlayerAudioLoop from "./player-audio-loop";
import PlayerAudioPlay from "./player-audio-play";

export default function PlayerAudio() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex items-center">
        <button>
          <LIcon icon={Shuffle} button />
        </button>
        <button>
          <LIcon icon={SkipBack} button />
        </button>
        <PlayerAudioPlay />
        <button>
          <LIcon icon={SkipForward} button />
        </button>
        <PlayerAudioLoop />
      </div>
      <AudioTimeline />
    </div>
  );
}
