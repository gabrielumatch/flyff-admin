"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OptionsSelectOption = {
  value: string;
  label?: string;
};

type OptionsSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | OptionsSelectOption>;
  placeholder?: string;
  className?: string;
};

export function OptionsSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  className,
}: OptionsSelectProps) {
  const normalized = options.map((opt) =>
    typeof opt === "string"
      ? { value: opt, label: opt }
      : { value: opt.value, label: opt.label ?? opt.value }
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={className ?? "w-full"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {normalized.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
