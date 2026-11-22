import { Button as ButtonPrimitive } from "@base-ui/react/button";
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@nawet/ds-core/recipes/button";
import { cn } from "@nawet/ds-core/utils";

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & ButtonVariantProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
