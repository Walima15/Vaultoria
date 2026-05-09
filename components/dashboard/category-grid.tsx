"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/lib/data";
import {
  Building2,
  Image,
  FileText,
  Landmark,
  Music,
  Video,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "building-2": Building2,
  image: Image,
  "file-text": FileText,
  landmark: Landmark,
  music: Music,
  video: Video,
};

interface CategoryGridProps {
  selectedCategory?: string;
  onSelect?: (id: string) => void;
}

export function CategoryGrid({ selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => {
        const Icon = iconMap[category.icon] || FileText;
        const isSelected = selectedCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => onSelect?.(category.id)}
            className={`relative p-4 rounded-xl transition-all duration-300 text-center group ${
              isSelected
                ? "glass-card border-primary bg-primary/10"
                : "glass-card glass-hover"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                category.color === "gold"
                  ? "bg-primary/10"
                  : "bg-accent/10"
              } ${isSelected ? "bg-primary/20" : ""}`}
            >
              <Icon
                className={`w-6 h-6 ${
                  category.color === "gold" ? "text-primary" : "text-accent"
                }`}
              />
            </div>
            <h3 className="text-sm font-medium mb-1 line-clamp-2">
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {category.count.toLocaleString()}
            </p>
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                layoutId="categoryHighlight"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
