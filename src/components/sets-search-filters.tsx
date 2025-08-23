"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchableCombobox } from "@/components/searchable-combobox";

import { Search } from "lucide-react";

interface SetsSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  numFilter: string;
  onNumFilterChange: (value: string) => void;
  numOptions: string[];
  jobFilter: string;
  onJobFilterChange: (value: string) => void;
  sexFilter: string;
  onSexFilterChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  jobOptions: string[];
  sexOptions: string[];
  levelOptions: string[];
}

export function SetsSearchFilters({
  searchTerm,
  onSearchChange,
  numFilter,
  onNumFilterChange,
  numOptions,
  jobFilter,
  onJobFilterChange,
  sexFilter,
  onSexFilterChange,
  levelFilter,
  onLevelFilterChange,
  jobOptions,
  sexOptions,
  levelOptions,
}: SetsSearchFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
        <CardDescription>
          Search by set name or elements; filter by set number, job, sex, and level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search set name or elements..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="num">Set Number</Label>
            <SearchableCombobox
              options={["all", ...numOptions]}
              value={numFilter}
              onValueChange={onNumFilterChange}
              placeholder="All sets"
              searchPlaceholder="Search set numbers..."
              emptyMessage="No set numbers found."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job">Job</Label>
            <SearchableCombobox
              options={["all", ...jobOptions]}
              value={jobFilter}
              onValueChange={onJobFilterChange}
              placeholder="All jobs"
              searchPlaceholder="Search jobs..."
              emptyMessage="No jobs found."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <SearchableCombobox
              options={["all", ...sexOptions]}
              value={sexFilter}
              onValueChange={onSexFilterChange}
              placeholder="All sexes"
              searchPlaceholder="Search sexes..."
              emptyMessage="No sexes found."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <SearchableCombobox
              options={["all", ...levelOptions]}
              value={levelFilter}
              onValueChange={onLevelFilterChange}
              placeholder="All levels"
              searchPlaceholder="Search levels..."
              emptyMessage="No levels found."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
