"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
          <div className="absolute inset-0 glass" />

          <div className="relative px-8 md:px-16 py-16 md:py-24 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-8"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="text-gradient-gold">Preserve History?</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of archivists, historians, and institutions
              protecting cultural heritage for future generations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 group"
                asChild
              >
                <Link href="/register">
                  Start Archiving
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-foreground hover:bg-secondary"
                asChild
              >
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-20 h-20 border border-primary/20 rounded-full" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-accent/20 rounded-full" />
            <div className="absolute top-1/2 right-16 w-4 h-4 bg-primary/40 rounded-full blur-sm" />
            <div className="absolute bottom-1/3 left-12 w-3 h-3 bg-accent/40 rounded-full blur-sm" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
