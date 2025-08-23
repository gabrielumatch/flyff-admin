"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SetsSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  numFilter: string;
  onNumFilterChange: (value: string) => void;
  numOptions: string[];
}

export function SetsSearchFilters({
  searchTerm,
  onSearchChange,
  numFilter,
  onNumFilterChange,
  numOptions,
}: SetsSearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Search */}
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">
          Search sets
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search sets by name or elements..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Num Filter */}
      <div className="w-full md:w-48">
        <Label htmlFor="num-filter">Set Number</Label>
        <Select value={numFilter} onValueChange={onNumFilterChange}>
          <SelectTrigger id="num-filter">
            <SelectValue placeholder="All sets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sets</SelectItem>
            {numOptions.map((num) => (
              <SelectItem key={num} value={num}>
                Set {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
