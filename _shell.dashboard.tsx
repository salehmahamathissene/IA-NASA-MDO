import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  FolderKanban,
  Cog,
  Sparkles,
  FlaskConical,
  Bot,
  Cpu,
  Plane,
  Activity,
  TrendingUp,
  Plus,
  Download,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReTooltip,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_shell/dashboard")({
  component: DashboardPage,
});

const performanceData = [
  { m: "Jan", ld: 16.2, fuel: 2.4 },
  { m: "Feb", ld: 16.8, fuel: 2.35 },
  { m: "Mar", ld: 17.4, fuel: 2.28 },
  { m: "Apr", ld: 17.9, fuel: 2.2 },
  { m: "May", ld: 18.3, fuel: 2.12 },
  { m: "Jun", ld: 18.9, fuel: 2.05 },
  { m: "Jul", ld: 19.4, fuel: 1.98 },
];

const activities = [
  { t: "2 min ago", who: "N. Okafor", action: "started CFD run on Baobab-A320", type: "cfd" },
  { t: "18 min ago", who: "AI Assistant", action: "recommended new winglet design for Sahel-Jet", type: "ai" },
  { t: "1 h ago", who: "K. Diallo", action: "converged MDO run — MTOW reduced 3.2%", type: "opt" },
  { t: "3 h ago", who: "System", action: "Digital Twin telemetry synced (Engine #2)", type: "twin" },
  { t: "6 h ago", who: "A. Mensah", action: "created new project: Kilimanjaro Regional", type: "project" },
];

interface QueueItem {
  id: number;
  project_name: string;
  type: string;
  status: string;
  progress: number;
}

function DashboardPage() {
  // Real State Trackers for Oracle Data
  const [liveStats, setLiveStats] = useState({
    total_projects: 0,
    total_simulations: 0,
    optimization_runs: 342,
    digital_twins: 6
  });
  const [liveQueue, setLiveQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    // 1. Fetch Summary counts from Oracle tables
    fetch("http://localhost:8000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.total_projects !== undefined) {
          setLiveStats(data);
        }
      })
      .catch((err) => console.error("Error reading Oracle Metrics:", err));

    // 2. Fetch Active SQL queue rows
    fetch("http://localhost:8000/api/dashboard/simulations-queue")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Map raw data from database schema rows to dashboard list items
          const mapped = data.map((item: any, idx: number) => ({
            id: item.id,
            name: `${item.project_name} · ${item.type}`,
            status: item.status || "Running",
            progress: item.status === "COMPLETED" ? 100 : idx === 0 ? 75 : 40
          }));
          setLiveQueue(mapped);
        }
      })
      .catch((err) => console.error("Error reading Simulation queues:", err));
  }, []);

  const metricCards = [
    { label: "Total Projects", value: liveStats.total_projects, delta: "+3 this week", icon: FolderKanban, color: "text-chart-1" },
    { label: "Aircraft Configurations", value: 87, delta: "+12", icon: Cog, color: "text-chart-2" },
    { label: "Optimization Runs", value: liveStats.optimization_runs, delta: "+48", icon: Sparkles, color: "text-chart-3" },
    { label: "CFD Simulations", value: liveStats.total_simulations, delta: "+9 queued", icon: FlaskConical, color: "text-chart-4" },
    { label: "AI Recommendations", value: 1204, delta: "+96", icon: Bot, color: "text-chart-1" },
    { label: "Digital Twins", value: liveStats.digital_twins, delta: "2 live", icon: Cpu, color: "text-chart-2" },
  ];

  return (
    <AppShell
      title="Mission Control"
      subtitle="Overview of your aerospace design workspace"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Plus className="mr-1 h-4 w-4" /> New Project
          </Button>
        </>
      }
    >
      {/* Dynamic Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {metricCards.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <Badge variant="outline" className="text-[0.65rem]">
                  {s.delta}
                </Badge>
              </div>
              <div className="mt-3 text-2xl font-semibold">{s.value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphs & Queues */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Aerodynamic Efficiency</CardTitle>
              <p className="text-xs text-muted-foreground">L/D ratio and specific fuel consumption over time</p>
            </div>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="ld" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                    <stop offset="1" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Area type="monotone" dataKey="ld" name="L/D Ratio" stroke="var(--color-chart-1)" fill="url(#ld)" />
                <Area type="monotone" dataKey="fuel" name="SFC" stroke="var(--color-chart-3)" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Real Dynamic Simulation List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Simulation Queue</CardTitle>
            <p className="text-xs text-muted-foreground">Compute cluster · 128 vCPU available</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveQueue.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-4">No simulations found in Oracle database.</div>
            ) : (
              liveQueue.map((q) => (
                <div key={q.id}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium truncate">{q.name}</span>
                    <Badge variant="outline" className="text-[0.6rem]">
                      {q.status}
                    </Badge>
                  </div>
                  <Progress value={q.progress} className="mt-2 h-1.5" />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Logs */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Latest Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-md border border-border/40 bg-background/40 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {a.type === "cfd" ? <FlaskConical className="h-4 w-4" /> : a.type === "ai" ? <Bot className="h-4 w-4" /> : a.type === "opt" ? <Sparkles className="h-4 w-4" /> : a.type === "twin" ? <Cpu className="h-4 w-4" /> : <FolderKanban className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{a.who}</span> {a.action}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.t}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fleet Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Fleet Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Baobab-A320", status: "Healthy", icon: Plane, tone: "text-success" },
              { name: "Sahel-Jet", status: "Optimizing", icon: Activity, tone: "text-warning" },
              { name: "Serengeti-UAV", status: "Live twin", icon: Cpu, tone: "text-info" },
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between rounded-md border border-border/40 bg-background/40 p-3">
                <div className="flex items-center gap-3">
                  <f.icon className={`h-4 w-4 ${f.tone}`} />
                  <span className="text-sm font-medium">{f.name}</span>
                </div>
                <span className={`text-xs ${f.tone}`}>{f.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}