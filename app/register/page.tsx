"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VaultoriaLogo } from "@/components/vaultoria-logo";
import { AnimatedBackground } from "@/components/animated-background";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  ArrowRight,
  User,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "viewer";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"viewer" | "contributor">(
    defaultRole as "viewer" | "contributor"
  );
  const [registerMethod, setRegisterMethod] = useState<"email" | "wallet">(
    "email"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push(role === "contributor" ? "/contributor" : "/viewer");
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push(role === "contributor" ? "/contributor" : "/viewer");
  };

  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4 py-16">
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
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm">
              Join the decentralized archive network
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Account Type
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole("viewer")}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  role === "viewer"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {role === "viewer" && (
                  <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                )}
                <div className="text-sm font-medium mb-1">Viewer</div>
                <div className="text-xs text-muted-foreground">
                  Browse and access archives
                </div>
              </button>
              <button
                onClick={() => setRole("contributor")}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  role === "contributor"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {role === "contributor" && (
                  <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                )}
                <div className="text-sm font-medium mb-1">Contributor</div>
                <div className="text-xs text-muted-foreground">
                  Upload and manage archives
                </div>
              </button>
            </div>
          </div>

          {/* Register Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 rounded-lg bg-secondary">
            <button
              onClick={() => setRegisterMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                registerMethod === "email"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setRegisterMethod("wallet")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                registerMethod === "wallet"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Wallet
            </button>
          </div>

          {registerMethod === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 bg-secondary border-border"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={handleWalletConnect}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Wallet className="w-5 h-5" />
                    Connect Solana Wallet
                  </span>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Supports Phantom, Solflare, and other Solana wallets
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our{" "}
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
