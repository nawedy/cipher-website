// src/components/ui/card.tsx
// Glass morphism card components with division theming and interactive states

import * as React from "react";
import { cn } from "@/lib/utils";
import { CardProps, FeatureCardProps, TestimonialCardProps, PricingCardProps } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { getDivisionColor } from "@/config/divisions";
import { Star, Check } from "lucide-react";
import { Button, GradientButton } from "./button";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        glass: "bg-white/5 backdrop-blur-md border-white/10",
        highlighted: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-white/20",
        division: "backdrop-blur-md border-opacity-20",
      },
      interactive: {
        true: "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

// Purpose: Base card component with glass morphism support
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, division, interactive, ...props }, ref) => {
    const divisionStyles = division 
      ? {
          borderColor: `${getDivisionColor(division, 'accent')}20`,
          background: `linear-gradient(135deg, ${getDivisionColor(division, 'primary')}10, transparent)`,
        }
      : {};

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, interactive, className }))}
        style={variant === 'division' ? divisionStyles : undefined}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Purpose: Feature card component for service showcases
const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon: Icon, title, description, division, href, ...props }, ref) => {
    const CardComponent = href ? "a" : "div";
    const cardProps = href ? { href } : {};

    return (
      <Card
        ref={ref}
        variant="glass"
        division={division}
        interactive={!!href}
        className={cn("p-6 group", className)}
        {...cardProps}
        {...props}
      >
        <div className="flex items-start space-x-4">
          <div 
            className="flex-shrink-0 p-2 rounded-lg"
            style={{
              background: division 
                ? `linear-gradient(135deg, ${getDivisionColor(division, 'accent')}20, ${getDivisionColor(division, 'primary')}10)`
                : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.1))'
            }}
          >
            <Icon className="h-6 w-6" style={{ 
              color: division ? getDivisionColor(division, 'accent') : '#3b82f6' 
            }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

// Purpose: Testimonial card for social proof sections
const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, quote, author, featured = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant={featured ? "highlighted" : "glass"}
        className={cn("p-6", featured && "ring-2 ring-primary/20", className)}
        {...props}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <blockquote className="text-foreground leading-relaxed">
            "{quote}"
          </blockquote>
          
          <div className="flex items-center space-x-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-foreground">{author.name}</div>
              <div className="text-sm text-muted-foreground">
                {author.title} at {author.company}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

// Purpose: Pricing card for product and service pricing
const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ 
    className, 
    title, 
    price, 
    period = "month", 
    description, 
    features, 
    popular = false,
    division,
    ctaText = "Get Started",
    ctaHref = "#",
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={popular ? "highlighted" : "glass"}
        division={division}
        className={cn(
          "p-6 relative",
          popular && "scale-105 ring-2 ring-primary/30",
          className
        )}
        {...props}
      >
        {popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm mt-2">{description}</p>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-foreground">{price}</span>
            {period && (
              <span className="text-muted-foreground">/{period}</span>
            )}
          </div>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="pt-4">
            {division ? (
              <GradientButton division={division} className="w-full">
                {ctaText}
              </GradientButton>
            ) : (
              <Button variant={popular ? "default" : "secondary"} className="w-full">
                {ctaText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }
);
PricingCard.displayName = "PricingCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  TestimonialCard,
  PricingCard,
  cardVariants,
};

export type { CardProps, FeatureCardProps, TestimonialCardProps, PricingCardProps };