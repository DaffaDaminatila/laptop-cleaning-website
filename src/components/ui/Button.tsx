import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "whatsapp" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]";
    const variants = {
      primary: "bg-blue-800 text-white hover:bg-blue-900",
      whatsapp: "bg-emerald-600 text-white hover:bg-emerald-700",
      outline: "border border-slate-300 text-slate-900 hover:border-blue-800 hover:text-blue-800 bg-white",
      ghost: "text-blue-800 hover:bg-slate-100",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[44px]",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-base",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white rounded-lg border border-slate-200 ${className}`}>{children}</div>
);
