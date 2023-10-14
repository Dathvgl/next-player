import PlayerLastList from "./player-last-list";
import PlayerLastVolume from "./player-last-volume";

export default function PlayerLast() {
  console.log("meme");
  
  return (
    <div className="flex items-center justify-end gap-2 lg:basis-1/4">
      <PlayerLastVolume />
      <PlayerLastList />
    </div>
  );
}
