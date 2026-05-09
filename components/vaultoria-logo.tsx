"use client";

import { motion } from "framer-motion";

export function VaultoriaLogo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <linearGradient
              id="goldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#C5A028" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient
              id="blueGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4A7FC7" />
              <stop offset="100%" stopColor="#2E5A9E" />
            </linearGradient>
          </defs>
          {/* Outer hexagon vault shape */}
          <path
            d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            fill="none"
          />
          {/* Inner V shape */}
          <path
            d="M12 12L20 28L28 12"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Small accent dots */}
          <circle cx="20" cy="8" r="2" fill="url(#blueGradient)" />
          <circle cx="20" cy="32" r="1.5" fill="url(#goldGradient)" />
        </svg>
        <div className="absolute inset-0 blur-lg bg-primary/30 rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wider text-gradient-gold">
          VAULTORIA
        </span>
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Digital Archive
        </span>
      </div>
    </motion.div>
  );
}

export function VaultoriaIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#C5A028" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="blueGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7FC7" />
          <stop offset="100%" stopColor="#2E5A9E" />
        </linearGradient>
      </defs>
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        stroke="url(#goldGradientIcon)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 12L20 28L28 12"
        stroke="url(#goldGradientIcon)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="20" cy="8" r="2" fill="url(#blueGradientIcon)" />
    </svg>
  );
}
