"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange?: (filters: SearchFiltersState) => void;
}

export interface SearchFiltersState {
  yearRange: [number, number];
  region: string;
  fileType: string;
  verifiedOnly: boolean;
  sortBy: string;
}

const defaultFilters: SearchFiltersState = {
  yearRange: [-3000, 2024],
  region: "all",
  fileType: "all",
  verifiedOnly: false,
  sortBy: "relevance",
};

const regions = [
  { value: "all", label: "All Regions" },
  { value: "united-states", label: "United States" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "Africa" },
  { value: "middle-east", label: "Middle East" },
  { value: "oceania", label: "Oceania" },
  { value: "south-america", label: "South America" },
];

const fileTypes = [
  { value: "all", label: "All Types" },
  { value: "document", label: "Documents" },
  { value: "image", label: "Images" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
];

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most-viewed", label: "Most Viewed" },
  { value: "most-downloaded", label: "Most Downloaded" },
];

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>(defaultFilters);
  const [open, setOpen] = useState(false);

  const updateFilters = (partial: Partial<SearchFiltersState>) => {
    const newFilters = { ...filters, ...partial };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return year.toString();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
          <SheetDescription>
            Refine your search results with advanced filters
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Year Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Year Range</Label>
              <span className="text-sm text-muted-foreground">
                {formatYear(filters.yearRange[0])} - {formatYear(filters.yearRange[1])}
              </span>
            </div>
            <Slider
              value={filters.yearRange}
              onValueChange={(value) =>
                updateFilters({ yearRange: value as [number, number] })
              }
              min={-3000}
              max={2024}
              step={10}
              className="w-full"
            />
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              value={filters.region}
              onValueChange={(value) => updateFilters({ region: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Type */}
          <div className="space-y-2">
            <Label>File Type</Label>
            <Select
              value={filters.fileType}
              onValueChange={(value) => updateFilters({ fileType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Verified Only */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Verified Only</Label>
              <p className="text-xs text-muted-foreground">
                Show only blockchain-verified archives
              </p>
            </div>
            <Switch
              checked={filters.verifiedOnly}
              onCheckedChange={(checked) =>
                updateFilters({ verifiedOnly: checked })
              }
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={resetFilters}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => setOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
