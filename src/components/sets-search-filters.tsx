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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
        <CardDescription>
          Search by set name or elements; filter by set number
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="num-filter">Set Number</Label>
            <Select value={numFilter} onValueChange={onNumFilterChange}>
              <SelectTrigger id="num-filter" className="w-full min-w-[200px]">
                <SelectValue placeholder="All sets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {numOptions.map((num) => (
                  <SelectItem key={num} value={num}>
                    Set {num}
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
