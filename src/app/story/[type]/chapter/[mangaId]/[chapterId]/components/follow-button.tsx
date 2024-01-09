import { Heart } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { useMangaFollowState } from "~/contexts/manga-follow-state-context";

interface FollowButtonProps {
  id: string;
  chapters: string[];
}

export default function FollowButton({ id, chapters }: FollowButtonProps) {
  const mangaFollowStateContext = useMangaFollowState();
  const isFollow = mangaFollowStateContext?.stateFollow ? true : false;

  async function onFollow() {
    if (!mangaFollowStateContext) return;

    if (isFollow) {
      await mangaFollowStateContext.deleteFollow();
    } else {
      await mangaFollowStateContext.postFollow();
      await mangaFollowStateContext.putFollow(id, chapters);
    }
  }

  return (
    <Button
      className={`rounded-3xl ${
        isFollow
          ? "[&_svg]:fill-red"
          : "[&_svg]:fill-black dark:[&_svg]:fill-white"
      }`}
      variant="outline"
      size="icon"
      onClick={onFollow}
    >
      <LIcon icon={Heart} fill={isFollow ? "red" : undefined} />
    </Button>
  );
}
