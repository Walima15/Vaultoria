"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleUsers, sampleArchives } from "@/lib/data";
import {
  Users,
  Archive,
  Shield,
  BarChart3,
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Ban,
  UserCheck,
  FileCheck,
  TrendingUp,
  Download,
} from "lucide-react";

const adminStats = [
  {
    title: "Total Users",
    value: "2,156",
    change: "+124 this week",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Archives",
    value: "12,458",
    change: "+342 this week",
    icon: Archive,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Pending Reviews",
    value: "47",
    change: "12 urgent",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Verified Today",
    value: "89",
    change: "+23% vs yesterday",
    icon: FileCheck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const pendingArchives = [
  {
    id: "pending-001",
    title: "Ancient Mesopotamian Tablets",
    contributor: "Dr. James Wilson",
    submittedAt: "2 hours ago",
    category: "Cultural Heritage",
  },
  {
    id: "pending-002",
    title: "World War II Letters Collection",
    contributor: "Historical Society",
    submittedAt: "5 hours ago",
    category: "Historical Photos",
  },
  {
    id: "pending-003",
    title: "Indigenous Language Recordings",
    contributor: "Linguistics Dept.",
    submittedAt: "1 day ago",
    category: "Audio Archives",
  },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = sampleUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userRole="admin" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Admin <span className="text-gradient-gold">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Manage users, moderate archives, and view platform analytics
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {adminStats.map((stat, index) => (
            <Card key={stat.title} className="glass-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="moderation" className="gap-2">
              <Shield className="w-4 h-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>User Management</CardTitle>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-secondary border-border"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin"
                                  ? "default"
                                  : user.role === "contributor"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="capitalize"
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs font-mono">
                              {user.walletAddress}
                            </code>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <span className="flex items-center gap-1 text-green-500 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-yellow-500 text-sm">
                                <Clock className="w-4 h-4" />
                                Pending
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {user.joinDate}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Approve as Contributor
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Ban className="w-4 h-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle>Pending Archive Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingArchives.map((archive) => (
                      <div
                        key={archive.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{archive.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>By {archive.contributor}</span>
                            <span>{archive.submittedAt}</span>
                            <Badge variant="outline">{archive.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        New Users (This Month)
                      </span>
                      <span className="font-bold text-primary">+456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        New Archives (This Month)
                      </span>
                      <span className="font-bold text-primary">+1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Verification Rate
                      </span>
                      <span className="font-bold text-green-500">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Active Contributors
                      </span>
                      <span className="font-bold text-accent">789</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-accent" />
                    Download Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Downloads
                      </span>
                      <span className="font-bold">2.4M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Downloads (This Week)
                      </span>
                      <span className="font-bold text-primary">45.2K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Most Popular Category
                      </span>
                      <span className="font-bold">Historical Photos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Avg. Downloads per Archive
                      </span>
                      <span className="font-bold text-accent">193</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
