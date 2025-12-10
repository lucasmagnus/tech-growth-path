import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border text-foreground",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/10 text-warning",
        expert: "border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow",
        good: "border-transparent bg-cyan text-cyan-foreground",
        beginner: "border-transparent bg-success/20 text-success",
        interested: "border-transparent bg-warning/20 text-warning",
        notInterested: "border-transparent bg-muted text-muted-foreground",
        achievement: "border-transparent bg-gradient-to-r from-accent to-primary text-primary-foreground px-3 py-1 shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
