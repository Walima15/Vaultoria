"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { CategoryGrid } from "@/components/dashboard/category-grid";
import { ArchiveGrid } from "@/components/dashboard/archive-card";
import { SearchFilters } from "@/components/dashboard/search-filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getArchives, type Archive } from "@/lib/data";
import { Search, Grid3X3, List, History } from "lucide-react";

export default function ViewerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [archives, setArchives] = useState<Archive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArchives()
      .then(setArchives)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredArchives = archives.filter((archive) => {
    const matchesCategory = !selectedCategory || 
      archive.category.toLowerCase().includes(selectedCategory.replace("-", " "));
    const matchesSearch = !searchQuery || 
      archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      archive.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userRole="viewer" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Explore the <span className="text-gradient-gold">Archive</span>
          </h1>
          <p className="text-muted-foreground">
            Discover millions of verified historical documents preserved on the
            blockchain
          </p>
        </motion.div>

        {/* Categories */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(undefined)}
              >
                Clear selection
              </Button>
            )}
          </div>
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </motion.section>

        {/* Search and Filters */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, description, year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <SearchFilters />
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {filteredArchives.length} archives
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredArchives.length > 0 ? (
            <ArchiveGrid archives={filteredArchives} />
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No archives found</h3>
              <p className="text-muted-foreground text-sm">
                {archives.length === 0
                  ? "No archives have been added yet. Check back soon."
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
