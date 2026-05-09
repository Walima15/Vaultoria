"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Archive,
  Eye,
  Download,
  TrendingUp,
  Users,
  FileCheck,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Archives",
    value: "156",
    change: "+12 this month",
    icon: Archive,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Views",
    value: "45.2K",
    change: "+23% from last month",
    icon: Eye,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Downloads",
    value: "8,923",
    change: "+15% from last month",
    icon: Download,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Verified",
    value: "142",
    change: "91% verification rate",
    icon: FileCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const recentActivity = [
  {
    title: "Declaration of Independence uploaded",
    time: "2 hours ago",
    status: "verified",
  },
  {
    title: "Berlin Wall photos pending review",
    time: "5 hours ago",
    status: "pending",
  },
  {
    title: "Apollo 11 footage verified",
    time: "1 day ago",
    status: "verified",
  },
  {
    title: "Research paper processing",
    time: "2 days ago",
    status: "processing",
  },
];

export function ContributorStats() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="glass-card border-border">
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
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === "verified"
                        ? "bg-green-500/10 text-green-500"
                        : activity.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
