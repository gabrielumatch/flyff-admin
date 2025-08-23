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

interface SkillSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  jobFilter: string;
  onJobFilterChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  jobOptions: string[];
  levelOptions: string[];
}

export function SkillSearchFilters({
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  levelFilter,
  onLevelFilterChange,
  jobOptions,
  levelOptions,
}: SkillSearchFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
        <CardDescription>
          Search by name or translations; filter by job and level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search name, EN or PT translations..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />
            </div>
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
