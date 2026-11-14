import { cn } from "cn"
import { Icons } from "@nawet/ui/icons"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Icons.loading data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
