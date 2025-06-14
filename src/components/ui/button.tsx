import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Gradient button component for division-specific styling
function GradientButton({
  className,
  division = "cig",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  division?: "cig" | "cs" | "cdw" | "cl" | "cst" | "cai"
}) {
  const gradientClasses = {
    cig: "bg-gradient-to-r from-cig-accent-primary to-cig-accent-secondary hover:from-cig-accent-primary/90 hover:to-cig-accent-secondary/90",
    cs: "bg-gradient-to-r from-cs-accent-primary to-cs-accent-secondary hover:from-cs-accent-primary/90 hover:to-cs-accent-secondary/90",
    cdw: "bg-gradient-to-r from-cdw-accent-primary to-cdw-accent-secondary hover:from-cdw-accent-primary/90 hover:to-cdw-accent-secondary/90",
    cl: "bg-gradient-to-r from-cl-accent-primary to-cl-accent-secondary hover:from-cl-accent-primary/90 hover:to-cl-accent-secondary/90",
    cst: "bg-gradient-to-r from-cst-accent-primary to-cst-accent-secondary hover:from-cst-accent-primary/90 hover:to-cst-accent-secondary/90",
    cai: "bg-gradient-to-r from-cai-accent-primary to-cai-accent-secondary hover:from-cai-accent-primary/90 hover:to-cai-accent-secondary/90",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "h-9 px-4 py-2 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        gradientClasses[division],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export { Button, buttonVariants, GradientButton }
