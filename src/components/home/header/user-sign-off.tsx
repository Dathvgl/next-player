import { UserCircle2 } from "lucide-react";
import { CustomIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { AuthContextProps } from "~/contexts/auth-context";
import { MotionUl, MotionLi } from "~/lib/motion";

interface UserSignOffProps extends Pick<AuthContextProps, "googleSignIn"> {}

export default function UserSignOff(props: UserSignOffProps) {
  const { googleSignIn } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <LIcon className="w-5 h-5" icon={UserCircle2} button />
        </button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden !w-auto">
        <MotionUl>
          <MotionLi className="flex justify-center">
            <Button onClick={async () => await googleSignIn()}>
              <LIcon className="w-5 h-5" icon={CustomIcons.google} />
              <span className="ml-3">Sign in with Google</span>
            </Button>
          </MotionLi>
        </MotionUl>
      </DialogContent>
    </Dialog>
  );
}
