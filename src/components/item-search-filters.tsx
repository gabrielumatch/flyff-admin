import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ItemSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  jobFilter: string;
  onJobFilterChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  jobOptions: string[];
  levelOptions: string[];
}

export function ItemSearchFilters({
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  levelFilter,
  onLevelFilterChange,
  jobOptions,
  levelOptions,
}: ItemSearchFiltersProps) {
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
            <Select value={jobFilter} onValueChange={onJobFilterChange}>
              <SelectTrigger id="job" className="w-full min-w-[200px]">
                <SelectValue placeholder="All jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {jobOptions.map((job) => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={levelFilter} onValueChange={onLevelFilterChange}>
              <SelectTrigger id="level" className="w-full min-w-[200px]">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {levelOptions.map((lv) => (
                  <SelectItem key={lv} value={lv}>
                    {lv}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
