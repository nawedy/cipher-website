import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// Demo component for showcasing marquee functionality
export function MarqueeDemo() {
  const testimonials = [
    {
      name: "Alice Johnson",
      title: "CTO at TechCorp",
      content: "Cipher Intelligence transformed our data strategy completely.",
    },
    {
      name: "Bob Smith",
      title: "CEO at InnovateLab",
      content: "Their AI solutions increased our efficiency by 300%.",
    },
    {
      name: "Carol Davis",
      title: "Director at FutureTech",
      content: "Outstanding digital transformation services.",
    },
    {
      name: "David Wilson",
      title: "VP at CloudSys",
      content: "The best intelligence platform we've ever used.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex w-64 flex-col justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              "{testimonial.content}"
            </p>
            <div className="mt-4">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
