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
            <Select value={numFilter} onValueChange={onNumFilterChange}>
              <SelectTrigger id="num" className="w-full">
                <SelectValue placeholder="All sets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {numOptions.map((num) => (
                  <SelectItem key={num} value={num}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="job">Job</Label>
            <Select value={jobFilter} onValueChange={onJobFilterChange}>
              <SelectTrigger id="job" className="w-full">
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
            <Label htmlFor="sex">Sex</Label>
            <Select value={sexFilter} onValueChange={onSexFilterChange}>
              <SelectTrigger id="sex" className="w-full">
                <SelectValue placeholder="All sexes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {sexOptions.map((sex) => (
                  <SelectItem key={sex} value={sex}>
                    {sex}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={levelFilter} onValueChange={onLevelFilterChange}>
              <SelectTrigger id="level" className="w-full">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {levelOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
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
