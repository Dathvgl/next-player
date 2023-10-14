import { Shuffle, SkipBack, SkipForward } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import AudioTimeline from "./audio-timeline";
import PlayerAudioLoop from "./player-audio-loop";
import PlayerAudioPlay from "./player-audio-play";
import PlayerAudioButton from "./player-audio-button";

export default function PlayerAudio() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-md:w-full max-md:gap-2">
      <div className="flex items-center max-md:w-full max-md:justify-evenly">
        <button>
          <LIcon icon={Shuffle} button />
        </button>
        <PlayerAudioButton increment={-1}>
          <LIcon icon={SkipBack} button />
        </PlayerAudioButton>
        <PlayerAudioPlay />
        <PlayerAudioButton increment={1}>
          <LIcon icon={SkipForward} button />
        </PlayerAudioButton>
        <PlayerAudioLoop />
      </div>
      <AudioTimeline />
    </div>
  );
}
