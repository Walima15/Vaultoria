"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Wallet,
  Calendar,
  ShieldCheck,
  Archive,
  CheckCircle2,
} from "lucide-react";

type Role = "viewer" | "contributor" | "admin";

interface ProfileData {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  wallet_address: string | null;
  verified: boolean;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signedOut, setSignedOut] = useState(false);
  const [archiveCount, setArchiveCount] = useState(0);

  const [fullName, setFullName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSignedOut(true);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const { count } = await supabase
        .from("archives")
        .select("id", { count: "exact", head: true })
        .eq("contributor_id", user.id);

      if (data) {
        setProfile(data as ProfileData);
        setFullName((data as ProfileData).full_name || "");
        setWalletAddress((data as ProfileData).wallet_address || "");
      }
      setArchiveCount(count || 0);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, wallet_address: walletAddress })
      .eq("id", profile.id);
    setIsSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSavedAt(Date.now());
    setProfile({ ...profile, full_name: fullName, wallet_address: walletAddress });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar userRole="viewer" />
        <div className="flex justify-center py-32">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (signedOut || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar userRole="viewer" />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-2">You&apos;re not signed in</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to view and manage your profile.
          </p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </main>
      </div>
    );
  }

  const joined = profile.created_at ? profile.created_at.slice(0, 10) : "—";

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userRole={profile.role} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            My <span className="text-gradient-gold">Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your account details and preferences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-card border-border">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">
                  {profile.full_name || "Unnamed user"}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {profile.email}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {profile.role}
                  </Badge>
                  {profile.verified ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">Unverified</Badge>
                  )}
                </div>

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined</span>
                    <span className="ml-auto font-medium">{joined}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Archive className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Archives</span>
                    <span className="ml-auto font-medium">{archiveCount}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Role</span>
                    <span className="ml-auto font-medium capitalize">
                      {profile.role}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Editable details */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {savedAt && (
                  <div className="rounded-lg border border-primary/50 bg-primary/10 px-4 py-3 text-sm text-primary">
                    Profile saved.
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={profile.email || ""}
                      disabled
                      className="pl-10 bg-secondary border-border opacity-70"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email is managed through your account and can&apos;t be edited here.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="wallet"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="Your Solana wallet address"
                      className="pl-10 bg-secondary border-border font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" asChild>
                    <Link href="/settings">Settings</Link>
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
