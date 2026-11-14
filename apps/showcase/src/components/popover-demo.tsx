import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@nawet/ui/components/popover";

export function PopoverDemo() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors cursor-pointer">
          Open popover
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Motion animation</PopoverTitle>
            <PopoverDescription>
              This popover fades and scales in with a 150ms spring — no bounce.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
