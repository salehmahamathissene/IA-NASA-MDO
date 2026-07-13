import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
} from "recharts";
import { Plus, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/_shell/cfd")({
  component: CFDPage,
});

const residuals = Array.from({ length: 60 }, (_, i) => ({
  it: i,
  u: Math.pow(10, -1 - i * 0.06),
  p: Math.pow(10, -0.7 - i * 0.05),
  k: Math.pow(10, -0.5 - i * 0.055),
}));

const jobs = [
  {
    id: "CFD-2041",
    name: "Baobab-A320 · Cruise M0.82",
    solver: "OpenFOAM · simpleFoam",
    cells: "18.4M",
    progress: 72,
    status: "Running",
  },
  {
    id: "CFD-2040",
    name: "Sahel-Jet · Takeoff Config",
    solver: "OpenFOAM · pimpleFoam",
    cells: "24.1M",
    progress: 100,
    status: "Done",
  },
  {
    id: "CFD-2039",
    name: "Serengeti-UAV · Yaw sweep",
    solver: "SU2 · RANS SA",
    cells: "8.7M",
    progress: 45,
    status: "Running",
  },
  {
    id: "CFD-2038",
    name: "Kilimanjaro · High-lift",
    solver: "OpenFOAM · rhoSimpleFoam",
    cells: "31.2M",
    progress: 12,
    status: "Meshing",
  },
];

function CFDPage() {
  return (
    <AppShell
      title="CFD Laboratory"
      subtitle="Distributed computational fluid dynamics — OpenFOAM · SU2"
      actions={
        <Button size="sm" className="bg-primary text-primary-foreground">
          <Plus className="mr-1 h-4 w-4" /> New Simulation
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="rounded-md border border-border/40 bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{j.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[0.65rem]">
                    {j.status}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[0.65rem] text-muted-foreground font-mono">
                  <span>{j.id}</span>
                  <span>{j.solver}</span>
                  <span>{j.cells} cells</span>
                </div>
                <Progress value={j.progress} className="h-1.5 mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Residuals · CFD-2041</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <LineChart data={residuals}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="it" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis
                  scale="log"
                  domain={[1e-7, 1]}
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickFormatter={(v) => v.toExponential(0)}
                />
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => v.toExponential(2)}
                />
                <Line
                  type="monotone"
                  dataKey="u"
                  name="U"
                  stroke="var(--color-chart-1)"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p"
                  name="p"
                  stroke="var(--color-chart-2)"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="k"
                  name="k"
                  stroke="var(--color-chart-3)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Field Contours</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Pressure (Cp)",
                grad: "linear-gradient(90deg, oklch(0.35 0.20 265), oklch(0.72 0.14 220), oklch(0.72 0.17 155), oklch(0.78 0.17 75), oklch(0.62 0.22 25))",
              },
              {
                label: "Velocity |U|",
                grad: "linear-gradient(90deg, oklch(0.20 0.02 250), oklch(0.55 0.20 265), oklch(0.78 0.16 210), oklch(0.90 0.10 100))",
              },
            ].map((c) => (
              <div key={c.label} className="rounded-lg border border-border/40 overflow-hidden">
                <div className="h-40" style={{ background: c.grad, opacity: 0.85 }}>
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    <ellipse cx="200" cy="55" rx="150" ry="8" fill="oklch(0 0 0 / 0.4)" />
                    <path d="M 200 50 L 80 90 L 140 90 Z" fill="oklch(0 0 0 / 0.4)" />
                    <path d="M 200 50 L 320 90 L 260 90 Z" fill="oklch(0 0 0 / 0.4)" />
                  </svg>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-background/60 text-xs">
                  <span className="font-medium">{c.label}</span>
                  <span className="font-mono text-muted-foreground">min ← → max</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
