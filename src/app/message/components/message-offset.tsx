import { BreakPoint } from "~/components/break-point";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import FindMessage from "./find-message";
import ListMessage from "./list-message";

export default function MessageOffset() {
  const child = (
    <ScrollArea className="h-full">
      <div className="flex flex-col w-[320px] max-md:w-full divide-y divide-black dark:divide-white">
        <FindMessage />
        <ListMessage />
      </div>
    </ScrollArea>
  );

  return (
    <>
      <BreakPoint base={["md"]}>
        <>{child}</>
      </BreakPoint>
      <BreakPoint base={["md"]} reverse>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="p-1.5 rounded-none">
              Danh sách
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0 w-[280px]" side="left">
            <>{child}</>
          </SheetContent>
        </Sheet>
      </BreakPoint>
    </>
  );
}
