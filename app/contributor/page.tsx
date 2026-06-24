"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { ContributorStats } from "@/components/dashboard/contributor-stats";
import { FileUploader } from "@/components/dashboard/file-uploader";
import { ArchiveGrid } from "@/components/dashboard/archive-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyArchives, type Archive as ArchiveType } from "@/lib/data";
import { Plus, Archive, BarChart3, Upload } from "lucide-react";

const VALID_TABS = ["overview", "upload", "archives"];

function ContributorDashboardInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab =
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : "overview";

  const [archives, setArchives] = useState<ArchiveType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMyArchives()
      .then(setArchives)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userRole="contributor" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Contributor <span className="text-gradient-gold">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your archives and track their performance
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="w-4 h-4" />
            New Upload
          </Button>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue={initialTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="archives" className="gap-2">
              <Archive className="w-4 h-4" />
              My Archives
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ContributorStats archives={archives} />
          </TabsContent>

          <TabsContent value="upload">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-2xl mx-auto">
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-2">Upload Archive</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Upload your historical documents to be preserved on the
                    blockchain. All files are stored on IPFS and verified.
                  </p>
                  <FileUploader />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="archives">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Archives</h2>
                <span className="text-sm text-muted-foreground">
                  {archives.length} total archives
                </span>
              </div>
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : archives.length > 0 ? (
                <ArchiveGrid archives={archives} />
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-lg font-semibold mb-2">No archives yet</h3>
                  <p className="text-muted-foreground text-sm">
                    Upload your first document to see it here.
                  </p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function ContributorDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContributorDashboardInner />
    </Suspense>
  );
}
