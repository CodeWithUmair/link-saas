import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/libs/utils"
import { LoaderCircle } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all eease-in-out duration-300 hover:duration-300",
        destructive:
          "bg-destructive text-background shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 transition-all eease-in-out duration-300 hover:duration-300",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-all eease-in-out duration-300 hover:duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 transition-all eease-in-out duration-300 hover:duration-300",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all eease-in-out duration-300 hover:duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all eease-in-out duration-300 hover:duration-300",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = loading || disabled;

    const content = (
      <>
        {children}
        {loading && <LoaderCircle className="animate-spin" />}
      </>
    );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          {
            "cursor-not-allowed": isDisabled,
          },
          'group flex gap-2 cursor-pointer'
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {asChild ? <span className="flex items-center gap-2">{content}</span> : content}
      </Comp>
    );
  }
);
Button.displayName = "Button"

export { Button, buttonVariants };