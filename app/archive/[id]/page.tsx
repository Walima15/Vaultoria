"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getArchiveById, type Archive } from "@/lib/data";
import {
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  FileText,
  Image,
  Music,
  Video,
  Hash,
  Link as LinkIcon,
  Clock,
  Eye,
  Copy,
  ExternalLink,
  Award,
} from "lucide-react";

const fileTypeIcons = {
  document: FileText,
  image: Image,
  audio: Music,
  video: Video,
};

export default function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [archive, setArchive] = useState<Archive | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArchiveById(id)
      .then(setArchive)
      .finally(() => setIsLoading(false));
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar userRole="viewer" />
        <div className="flex justify-center py-32">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!archive) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar userRole="viewer" />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-2">Archive not found</h1>
          <p className="text-muted-foreground mb-6">
            The archive you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/viewer">Back to Archive</Link>
          </Button>
        </main>
      </div>
    );
  }

  const FileIcon = fileTypeIcons[archive.fileType];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userRole="viewer" />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
            <Link href="/viewer">
              <ArrowLeft className="w-4 h-4" />
              Back to Archive
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card border-border overflow-hidden">
                <div className="aspect-video bg-secondary flex items-center justify-center relative">
                  <FileIcon className="w-24 h-24 text-muted-foreground/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="capitalize bg-primary/20 text-primary border-primary/30">
                      {archive.fileType}
                    </Badge>
                    {archive.verified && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified on-chain
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-4">{archive.title}</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    {archive.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Bookmark className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blockchain Verification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5 text-primary" />
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <LinkIcon className="w-4 h-4" />
                        IPFS Hash
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-primary break-all flex-1">
                          {archive.ipfsHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(archive.ipfsHash)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Hash className="w-4 h-4" />
                        Blockchain Transaction
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-accent break-all flex-1">
                          {archive.blockchainHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            copyToClipboard(archive.blockchainHash)
                          }
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">
                      This document&apos;s authenticity has been verified on the Solana
                      blockchain
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* NFT Certificate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card border-primary/30 glow-gold">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        Preservation Certificate
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        This archive has been issued an NFT certificate proving
                        its permanent preservation on the blockchain.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="font-medium">
                        {archive.year < 0
                          ? `${Math.abs(archive.year)} BCE`
                          : archive.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Region</p>
                      <p className="font-medium">{archive.region}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="font-medium">{archive.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Upload Date
                      </p>
                      <p className="font-medium">{archive.uploadDate}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="font-medium">
                        {archive.views.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Downloads</p>
                      <p className="font-medium">
                        {archive.downloads.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contributor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Contributor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{archive.contributor}</p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {archive.contributorAddress}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
