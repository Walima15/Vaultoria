"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-2xl p-8 md:p-12 glow-gold">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
