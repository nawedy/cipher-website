// src/components/ui/button.tsx
// Reusable button component with division theming and multiple variants

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        gradient:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant: variant as any, size: size as any, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Purpose: Division-specific gradient button component
interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  division?: 'cs' | 'cdw' | 'cl' | 'cst' | 'cai' | 'cig';
}

const divisionGradients = {
  cs: "from-emerald-600 to-cyan-500",
  cdw: "from-teal-500 to-blue-500", 
  cl: "from-blue-500 to-purple-600",
  cst: "from-slate-500 to-blue-500",
  cai: "from-orange-500 to-purple-600",
  cig: "from-blue-600 to-yellow-500"
};

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, division = 'cig', loading, children, disabled, ...props }, ref) => {
    const gradientClass = divisionGradients[division];
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
          "bg-gradient-to-r text-white shadow-lg hover:shadow-xl",
          "transition-all duration-200 hover:scale-105 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-4 py-2", // default size
          `bg-gradient-to-r ${gradientClass}`,
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";

// Purpose: Icon button for navigation and actions
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, label, variant = "ghost", size = "icon", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("", className)}
        aria-label={label}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

// Purpose: CTA button with enhanced styling for landing pages
interface CTAButtonProps extends ButtonProps {
  glow?: boolean;
  pulse?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, glow = false, pulse = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="default"
        size="lg"
        className={cn(
          "relative font-semibold",
          glow && "shadow-2xl shadow-blue-500/25",
          pulse && "animate-pulse",
          "hover:scale-105 transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
CTAButton.displayName = "CTAButton";

export { Button, GradientButton, IconButton, CTAButton, buttonVariants };
export type { ButtonProps, GradientButtonProps, IconButtonProps, CTAButtonProps };