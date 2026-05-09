"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import {
  ShieldCheck,
  Fingerprint,
  Network,
  Key,
  History,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  fingerprint: Fingerprint,
  network: Network,
  key: Key,
  history: History,
  globe: Globe,
};

export function FeaturesSection() {
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
            Why Vaultoria
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Built for <span className="text-gradient-gold">Permanence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our decentralized architecture ensures your historical documents
            remain accessible and verifiable for generations to come.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={feature.title}
                className="glass-card glass-hover rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
