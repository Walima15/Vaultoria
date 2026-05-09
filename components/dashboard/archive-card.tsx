"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Archive } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Image,
  Music,
  Video,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  MapPin,
} from "lucide-react";

const fileTypeIcons = {
  document: FileText,
  image: Image,
  audio: Music,
  video: Video,
};

interface ArchiveCardProps {
  archive: Archive;
  index?: number;
}

export function ArchiveCard({ archive, index = 0 }: ArchiveCardProps) {
  const FileIcon = fileTypeIcons[archive.fileType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/archive/${archive.id}`}
        className="group block glass-card glass-hover rounded-xl overflow-hidden transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <FileIcon className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Verified Badge */}
          {archive.verified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </Badge>
            </div>
          )}

          {/* File Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="capitalize">
              {archive.fileType}
            </Badge>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {archive.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {archive.downloads.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {archive.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {archive.description}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{archive.year < 0 ? `${Math.abs(archive.year)} BCE` : archive.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-20">{archive.region}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ArchiveGridProps {
  archives: Archive[];
}

export function ArchiveGrid({ archives }: ArchiveGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {archives.map((archive, index) => (
        <ArchiveCard key={archive.id} archive={archive} index={index} />
      ))}
    </div>
  );
}
