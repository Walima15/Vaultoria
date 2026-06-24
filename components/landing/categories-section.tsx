"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories, getCategoriesWithCounts, type CategoryWithCount } from "@/lib/data";
import {
  Building2,
  Image,
  FileText,
  Landmark,
  Music,
  Video,
  ArrowRight,
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

export function CategoriesSection() {
  const [items, setItems] = useState<CategoryWithCount[]>(
    categories.map((c) => ({ ...c, count: 0 }))
  );

  useEffect(() => {
    getCategoriesWithCounts().then(setItems);
  }, []);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Explore Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Browse the <span className="text-gradient-gold">Archive</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover millions of verified historical documents across various
            categories, each cryptographically secured on the blockchain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((category, index) => {
            const Icon = iconMap[category.icon] || FileText;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/viewer?category=${category.id}`}
                  className="group block glass-card glass-hover rounded-xl p-6 transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                        category.color === "gold"
                          ? "bg-primary/10"
                          : "bg-accent/10"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          category.color === "gold"
                            ? "text-primary"
                            : "text-accent"
                        }`}
                      />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {category.count.toLocaleString()} archives
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
