import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface FieldHelpTooltipProps {
  label: ReactNode;
  help: ReactNode;
  className?: string;
}

export function FieldHelpTooltip({ label, help }: FieldHelpTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{label}</TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        className="max-w-80 text-base leading-relaxed whitespace-pre-line px-3 py-2"
      >
        {help}
      </TooltipContent>
    </Tooltip>
  );
}
