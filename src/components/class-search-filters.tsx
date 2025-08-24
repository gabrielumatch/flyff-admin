"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SearchableCombobox } from "@/components/searchable-combobox";
import { Search, X } from "lucide-react";

interface ClassSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  jobFilter: string;
  setJobFilter: (value: string) => void;
  resetFilters: () => void;
  selectOptionsByField: Record<string, string[]>;
}

export function ClassSearchFilters({
  searchTerm,
  setSearchTerm,
  jobFilter,
  setJobFilter,
  resetFilters,
  selectOptionsByField,
}: ClassSearchFiltersProps) {
  const jobOptions = selectOptionsByField["jobname"] || [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search by Job Name</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-filter">Filter by Job</Label>
          <SearchableCombobox
            options={jobOptions}
            value={jobFilter}
            onValueChange={setJobFilter}
            placeholder="Select job type"
            searchPlaceholder="Search jobs..."
            emptyMessage="No job types found."
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
