"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableCombobox } from "@/components/searchable-combobox";

interface MonsterSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  raceFilter: string;
  onRaceFilterChange: (value: string) => void;
  levelOptions: string[];
  raceOptions: string[];
}

export function MonsterSearchFilters({
  searchTerm,
  onSearchChange,
  levelFilter,
  onLevelFilterChange,
  raceFilter,
  onRaceFilterChange,
  levelOptions,
  raceOptions,
}: MonsterSearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search monsters by name, level, or race..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Level</Label>
        <SearchableCombobox
          options={["all", ...levelOptions]}
          value={levelFilter}
          onValueChange={onLevelFilterChange}
          placeholder="Select Level"
          searchPlaceholder="Search levels..."
          emptyMessage="No levels found."
        />
      </div>

      <div className="space-y-2">
        <Label>Race</Label>
        <SearchableCombobox
          options={["all", ...raceOptions]}
          value={raceFilter}
          onValueChange={onRaceFilterChange}
          placeholder="Select Race"
          searchPlaceholder="Search races..."
          emptyMessage="No races found."
        />
      </div>
    </div>
  );
}
