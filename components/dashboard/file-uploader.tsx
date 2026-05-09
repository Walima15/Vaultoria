"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Image,
  Music,
  Video,
  X,
  CheckCircle2,
  Loader2,
  Link as LinkIcon,
  Hash,
} from "lucide-react";

interface FileUploadProps {
  onUploadComplete?: (data: UploadedFile) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  ipfsHash: string;
}

const categories = [
  { value: "government", label: "Government Records" },
  { value: "historical-photos", label: "Historical Photos" },
  { value: "research", label: "Research Papers" },
  { value: "cultural", label: "Cultural Heritage" },
  { value: "audio", label: "Audio Archives" },
  { value: "video", label: "Videos" },
];

const regions = [
  { value: "united-states", label: "United States" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "Africa" },
  { value: "middle-east", label: "Middle East" },
  { value: "oceania", label: "Oceania" },
  { value: "south-america", label: "South America" },
];

export function FileUploader({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "processing" | "complete"
  >("idle");
  const [ipfsHash, setIpfsHash] = useState<string>("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setIpfsHash("");
  };

  const simulateUpload = async () => {
    if (!file) return;

    setUploadStatus("uploading");
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Simulate IPFS processing
    setUploadStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate fake IPFS hash
    const hash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setIpfsHash(hash);
    setUploadStatus("complete");

    onUploadComplete?.({
      name: file.name,
      size: file.size,
      type: file.type,
      ipfsHash: hash,
    });
  };

  const getFileIcon = () => {
    if (!file) return FileText;
    if (file.type.startsWith("image/")) return Image;
    if (file.type.startsWith("audio/")) return Music;
    if (file.type.startsWith("video/")) return Video;
    return FileText;
  };

  const FileIcon = getFileIcon();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        {!file ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Drop your file here, or{" "}
              <label className="text-primary cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4,.mov"
                />
              </label>
            </h3>
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOC, images, audio, and video files up to 100MB
            </p>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm truncate max-w-48">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              {uploadStatus !== "uploading" && uploadStatus !== "processing" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={removeFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadStatus === "processing" && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing with IPFS...</span>
              </div>
            )}

            {uploadStatus === "complete" && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-500">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Upload Complete</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <LinkIcon className="w-4 h-4" />
                    <span>IPFS Hash</span>
                  </div>
                  <code className="text-xs font-mono text-primary break-all">
                    {ipfsHash}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metadata Form */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 1776 or -500 for BCE"
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Region *</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((reg) => (
                    <SelectItem key={reg.value} value={reg.value}>
                      {reg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the document..."
              rows={4}
              className="bg-secondary border-border resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={
              uploadStatus === "uploading" ||
              uploadStatus === "processing" ||
              !title ||
              !year ||
              !category ||
              !region ||
              !description
            }
            onClick={simulateUpload}
          >
            {uploadStatus === "idle" && (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload to IPFS
              </>
            )}
            {uploadStatus === "uploading" && (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            )}
            {uploadStatus === "processing" && (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            )}
            {uploadStatus === "complete" && (
              <>
                <Hash className="w-4 h-4 mr-2" />
                Submit to Blockchain
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
