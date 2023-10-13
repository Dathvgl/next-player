import PlayerLastList from "./player-last-list";
import PlayerLastVolume from "./player-last-volume";

export default function PlayerLast() {
  return (
    <div className="flex items-center justify-end gap-2">
      <PlayerLastVolume />
      <PlayerLastList />
    </div>
  );
}
