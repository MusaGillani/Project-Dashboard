"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-secondary-100 hover:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-secondary-800 data-[state=on]:text-secondary-100 dark:ring-offset-secondary-950 dark:hover:bg-secondary-800 dark:hover:text-secondary-400 dark:focus-visible:ring-secondary-800 dark:data-[state=on]:bg-secondary-800 dark:data-[state=on]:text-secondary-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-secondary-200 bg-transparent hover:bg-slate-100 hover:text-secondary-900 dark:border-secondary-800 dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
