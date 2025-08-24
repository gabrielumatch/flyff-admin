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

interface ClassSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  jobFilter: string;
  onJobFilterChange: (value: string) => void;
  jobOptions: string[];
}

export function ClassSearchFilters({
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  jobOptions,
}: ClassSearchFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
        <CardDescription>
          Search by job name; filter by job type
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
                placeholder="Search job name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="job">Job Type</Label>
            <SearchableCombobox
              options={["all", ...jobOptions]}
              value={jobFilter}
              onValueChange={onJobFilterChange}
              placeholder="All job types"
              searchPlaceholder="Search job types..."
              emptyMessage="No job types found."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
