// Data layer for Vaultoria — all live data comes from Supabase.
import { createClient } from "@/lib/supabase/client";

export interface Archive {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  region: string;
  contributor: string;
  contributorAddress: string;
  uploadDate: string;
  ipfsHash: string;
  blockchainHash: string;
  verified: boolean;
  thumbnail: string;
  fileType: "document" | "image" | "audio" | "video";
  downloads: number;
  views: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "viewer" | "contributor" | "admin";
  walletAddress: string;
  joinDate: string;
  uploads?: number;
  verified: boolean;
}

export interface PlatformStat {
  label: string;
  value: string;
  suffix: string;
}

export interface CategoryWithCount {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

// Static category metadata (display only). Counts are loaded from the database.
export const categories: Omit<CategoryWithCount, "count">[] = [
  { id: "government", name: "Government Records", icon: "building-2", color: "gold" },
  { id: "historical-photos", name: "Historical Photos", icon: "image", color: "blue" },
  { id: "research", name: "Research Papers", icon: "file-text", color: "gold" },
  { id: "cultural", name: "Cultural Heritage", icon: "landmark", color: "blue" },
  { id: "audio", name: "Audio Archives", icon: "music", color: "gold" },
  { id: "video", name: "Videos", icon: "video", color: "blue" },
];

// Static marketing copy for the landing page.
export const features = [
  {
    title: "Tamper-Proof Storage",
    description:
      "Every document is cryptographically secured and immutably stored on the blockchain.",
    icon: "shield-check",
  },
  {
    title: "Blockchain Verification",
    description:
      "Each archive receives a unique hash that can be independently verified at any time.",
    icon: "fingerprint",
  },
  {
    title: "Decentralized Preservation",
    description:
      "Documents are distributed across multiple nodes ensuring permanent availability.",
    icon: "network",
  },
  {
    title: "Role-Based Access",
    description:
      "Granular permissions ensure sensitive documents are only accessible to authorized users.",
    icon: "key",
  },
  {
    title: "Historical Authenticity",
    description:
      "Timestamped records provide indisputable proof of document existence and origin.",
    icon: "history",
  },
  {
    title: "Global Accessibility",
    description:
      "Access preserved documents from anywhere in the world, anytime.",
    icon: "globe",
  },
];

interface ArchiveRow {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  region: string;
  contributor_name: string;
  contributor_address: string;
  ipfs_hash: string;
  blockchain_hash: string;
  verified: boolean;
  file_type: Archive["fileType"];
  downloads: number;
  views: number;
  created_at: string;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  role: User["role"];
  wallet_address: string | null;
  verified: boolean;
  created_at: string;
}

function mapArchive(row: ArchiveRow): Archive {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    year: row.year,
    region: row.region,
    contributor: row.contributor_name,
    contributorAddress: row.contributor_address,
    uploadDate: row.created_at ? row.created_at.slice(0, 10) : "",
    ipfsHash: row.ipfs_hash,
    blockchainHash: row.blockchain_hash,
    verified: row.verified,
    thumbnail: "",
    fileType: row.file_type,
    downloads: row.downloads,
    views: row.views,
  };
}

function mapProfile(row: ProfileRow): User {
  return {
    id: row.id,
    name: row.full_name || "Unnamed user",
    email: row.email || "",
    role: row.role,
    walletAddress: row.wallet_address || "",
    joinDate: row.created_at ? row.created_at.slice(0, 10) : "",
    verified: row.verified,
  };
}

export async function getArchives(): Promise<Archive[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("archives")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as ArchiveRow[]).map(mapArchive);
}

export async function getArchiveById(id: string): Promise<Archive | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("archives")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return mapArchive(data as ArchiveRow);
}

export async function getMyArchives(): Promise<Archive[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("archives")
    .select("*")
    .eq("contributor_id", user.id)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as ArchiveRow[]).map(mapArchive);
}

export async function getProfiles(): Promise<User[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as ProfileRow[]).map(mapProfile);
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const archives = await getArchives();
  return categories.map((category) => ({
    ...category,
    count: archives.filter(
      (a) =>
        a.category.toLowerCase() === category.name.toLowerCase() ||
        a.category.toLowerCase().includes(category.id.replace("-", " "))
    ).length,
  }));
}

export async function getPlatformStats(): Promise<PlatformStat[]> {
  const [archives, profiles] = await Promise.all([getArchives(), getProfiles()]);
  const verified = archives.filter((a) => a.verified).length;
  const contributors = profiles.filter(
    (p) => p.role === "contributor" || p.role === "admin"
  ).length;
  const countries = new Set(
    archives.map((a) => a.region).filter((r) => r.length > 0)
  ).size;

  return [
    { label: "Archives Preserved", value: archives.length.toLocaleString(), suffix: "" },
    { label: "Verified Documents", value: verified.toLocaleString(), suffix: "" },
    { label: "Active Contributors", value: contributors.toLocaleString(), suffix: "" },
    { label: "Countries Covered", value: countries.toLocaleString(), suffix: "" },
  ];
}
