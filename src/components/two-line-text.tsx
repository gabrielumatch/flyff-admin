import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TwoLineTextProps {
  primary: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

export function TwoLineText({
  primary,
  secondary,
  className,
}: TwoLineTextProps) {
  return (
    <div className={cn("leading-tight", className)}>
      <div>{primary}</div>
      {secondary ? (
        <div className="text-xs text-muted-foreground">{secondary}</div>
      ) : null}
    </div>
  );
}
