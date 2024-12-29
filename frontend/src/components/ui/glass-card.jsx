/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";



export function GlassCard({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "backdrop-blur-md bg-zinc-900/40 border border-zinc-800/50 rounded-2xl",
        "hover:bg-zinc-800/40 transition-all duration-300",
        "shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}