// Sample archive data for Vaultoria

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

export const categories = [
  {
    id: "government",
    name: "Government Records",
    icon: "building-2",
    count: 1245,
    color: "gold",
  },
  {
    id: "historical-photos",
    name: "Historical Photos",
    icon: "image",
    count: 3892,
    color: "blue",
  },
  {
    id: "research",
    name: "Research Papers",
    icon: "file-text",
    count: 2156,
    color: "gold",
  },
  {
    id: "cultural",
    name: "Cultural Heritage",
    icon: "landmark",
    count: 1567,
    color: "blue",
  },
  {
    id: "audio",
    name: "Audio Archives",
    icon: "music",
    count: 892,
    color: "gold",
  },
  {
    id: "video",
    name: "Videos",
    icon: "video",
    count: 456,
    color: "blue",
  },
];

export const stats = [
  { label: "Archives Preserved", value: "12,458", suffix: "+" },
  { label: "Verified Documents", value: "9,823", suffix: "" },
  { label: "Active Contributors", value: "2,156", suffix: "" },
  { label: "Countries Covered", value: "89", suffix: "" },
];

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

export const sampleArchives: Archive[] = [
  {
    id: "arch-001",
    title: "Declaration of Independence - Original Transcript",
    description:
      "A verified digital copy of the original Declaration of Independence with full provenance documentation.",
    category: "Government Records",
    year: 1776,
    region: "United States",
    contributor: "National Archives Foundation",
    contributorAddress: "7xKXt...4mNp",
    uploadDate: "2024-01-15",
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    blockchainHash: "0x8f3a2b...c4d5e6",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "document",
    downloads: 15234,
    views: 89456,
  },
  {
    id: "arch-002",
    title: "Berlin Wall Fall - Press Photography Collection",
    description:
      "A curated collection of 47 authenticated photographs documenting the fall of the Berlin Wall in 1989.",
    category: "Historical Photos",
    year: 1989,
    region: "Germany",
    contributor: "European History Archive",
    contributorAddress: "3vMnQ...8kLz",
    uploadDate: "2024-02-20",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    blockchainHash: "0x2a7b8c...9f0e1d",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "image",
    downloads: 8921,
    views: 45672,
  },
  {
    id: "arch-003",
    title: "Martin Luther King Jr. - I Have a Dream Speech Recording",
    description:
      "The complete audio recording of Dr. King's historic speech at the March on Washington, 1963.",
    category: "Audio Archives",
    year: 1963,
    region: "United States",
    contributor: "Civil Rights Digital Library",
    contributorAddress: "9pRsT...2wXy",
    uploadDate: "2024-03-05",
    ipfsHash: "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm",
    blockchainHash: "0x5c6d7e...8f9g0h",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "audio",
    downloads: 12456,
    views: 67890,
  },
  {
    id: "arch-004",
    title: "Ancient Egyptian Papyrus - Book of the Dead",
    description:
      "High-resolution scans of authenticated papyrus scrolls from the collection of ancient Egyptian funerary texts.",
    category: "Cultural Heritage",
    year: -1550,
    region: "Egypt",
    contributor: "Cairo Museum Digital",
    contributorAddress: "4uVwX...6yZa",
    uploadDate: "2024-01-28",
    ipfsHash: "QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX",
    blockchainHash: "0x1i2j3k...4l5m6n",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "image",
    downloads: 6789,
    views: 34521,
  },
  {
    id: "arch-005",
    title: "Apollo 11 Mission - Original NASA Footage",
    description:
      "Restored 4K footage of the Apollo 11 moon landing mission, including previously unreleased cockpit audio.",
    category: "Videos",
    year: 1969,
    region: "United States",
    contributor: "NASA Historical Archive",
    contributorAddress: "8bCdE...1fGh",
    uploadDate: "2024-02-14",
    ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    blockchainHash: "0x7o8p9q...0r1s2t",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "video",
    downloads: 23456,
    views: 156789,
  },
  {
    id: "arch-006",
    title: "Quantum Computing Breakthrough - Research Paper",
    description:
      "Peer-reviewed research paper documenting the first successful quantum supremacy experiment.",
    category: "Research Papers",
    year: 2019,
    region: "United States",
    contributor: "Scientific Archives Institute",
    contributorAddress: "5iJkL...3mNo",
    uploadDate: "2024-03-10",
    ipfsHash: "QmNvTjU8FJh5o8A36RKMGvYJvHQSm8Pnbq2VJwzKhL7mXZ",
    blockchainHash: "0x3u4v5w...6x7y8z",
    verified: true,
    thumbnail: "/api/placeholder/400/300",
    fileType: "document",
    downloads: 4567,
    views: 23456,
  },
];

export const sampleUsers: User[] = [
  {
    id: "user-001",
    name: "Dr. Sarah Mitchell",
    email: "s.mitchell@archives.org",
    role: "contributor",
    walletAddress: "7xKXtR9...4mNpQw",
    joinDate: "2023-06-15",
    uploads: 156,
    verified: true,
  },
  {
    id: "user-002",
    name: "James Chen",
    email: "j.chen@history.edu",
    role: "viewer",
    walletAddress: "3vMnQp8...kLzYx",
    joinDate: "2024-01-20",
    verified: true,
  },
  {
    id: "user-003",
    name: "Admin System",
    email: "admin@vaultoria.io",
    role: "admin",
    walletAddress: "9pRsTuV...wXyZa",
    joinDate: "2023-01-01",
    verified: true,
  },
];
