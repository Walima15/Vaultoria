"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VaultoriaLogo } from "@/components/vaultoria-logo";
import { AnimatedBackground } from "@/components/animated-background";
import { Mail, Lock, Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "wallet">("email");
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/viewer");
  };

  const handleWalletConnect = async (walletType: "phantom" | "glow") => {
    setConnectingWallet(walletType);
    setIsLoading(true);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setConnectingWallet(null);
    router.push("/viewer");
  };

  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <AnimatedBackground />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <VaultoriaLogo />
            </Link>
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access the archive
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 rounded-lg bg-secondary">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginMethod === "email"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod("wallet")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginMethod === "wallet"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Wallet
            </button>
          </div>

          {loginMethod === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-secondary border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-secondary border-border"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-2">
                Choose your Solana wallet
              </p>
              
              {/* Phantom Wallet */}
              <Button
                onClick={() => handleWalletConnect("phantom")}
                className="w-full bg-[#AB9FF2] hover:bg-[#AB9FF2]/90 text-white h-14"
                disabled={isLoading}
              >
                {connectingWallet === "phantom" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting to Phantom...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
                      <circle cx="64" cy="64" r="64" fill="currentColor" fillOpacity="0.2"/>
                      <path d="M110.584 64.9142H99.142C99.142 41.7651 80.173 23 56.7724 23C33.6612 23 14.8716 41.3057 14.4118 64.0583C13.936 87.5183 35.8761 107.5 59.9043 107.5H63.3279C84.3315 107.5 110.584 89.2057 110.584 64.9142Z" fill="white"/>
                      <path d="M77.8896 66.7276C77.8896 70.1758 75.0863 72.9791 71.6381 72.9791C68.1899 72.9791 65.3866 70.1758 65.3866 66.7276C65.3866 63.2794 68.1899 60.4761 71.6381 60.4761C75.0863 60.4761 77.8896 63.2794 77.8896 66.7276Z" fill="#AB9FF2"/>
                      <path d="M51.1227 66.7276C51.1227 70.1758 48.3194 72.9791 44.8712 72.9791C41.423 72.9791 38.6197 70.1758 38.6197 66.7276C38.6197 63.2794 41.423 60.4761 44.8712 60.4761C48.3194 60.4761 51.1227 63.2794 51.1227 66.7276Z" fill="#AB9FF2"/>
                    </svg>
                    Connect Phantom
                  </span>
                )}
              </Button>

              {/* Glow Wallet */}
              <Button
                onClick={() => handleWalletConnect("glow")}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white h-14"
                disabled={isLoading}
              >
                {connectingWallet === "glow" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting to Glow...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="8" fill="url(#glow-gradient)"/>
                      <path d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8ZM16 22C12.686 22 10 19.314 10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16C22 19.314 19.314 22 16 22Z" fill="white"/>
                      <circle cx="16" cy="16" r="4" fill="white"/>
                      <defs>
                        <linearGradient id="glow-gradient" x1="0" y1="0" x2="32" y2="32">
                          <stop stopColor="#7C3AED"/>
                          <stop offset="1" stopColor="#EC4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    Connect Glow
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => router.push("/viewer")}
                className="w-full text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                Continue without wallet (Demo Mode)
              </Button>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                New to Vaultoria?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/register">Create an Account</Link>
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
