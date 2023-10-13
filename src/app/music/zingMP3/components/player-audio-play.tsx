import { PauseCircle, PlayCircle } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import { zingMP3Play } from "~/redux/features/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

export default function PlayerAudioPlay() {
  const play = useAppSelector((state) => state.music.zingMP3.play);
  const dispatch = useAppDispatch();

  function playHandle() {
    dispatch(zingMP3Play(!play));
  }

  return (
    <button onClick={playHandle}>
      {play ? (
        <LIcon icon={PauseCircle} button size={30} />
      ) : (
        <LIcon icon={PlayCircle} button size={30} />
      )}
    </button>
  );
}
