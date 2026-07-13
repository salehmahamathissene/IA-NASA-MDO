import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";
import { Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_shell/optimization")({
  component: OptPage,
});

const history = Array.from({ length: 25 }, (_, i) => ({
  it: i,
  obj: 1 - 0.6 * (1 - Math.exp(-i / 6)) + Math.random() * 0.02,
  c1: Math.max(0, 0.4 - i * 0.02),
}));

const objectives = [
  { k: "Minimum fuel", val: "-6.2%", tone: "success" },
  { k: "Maximum range", val: "+8.4%", tone: "info" },
  { k: "Minimum weight", val: "-3.2%", tone: "success" },
  { k: "Maximum payload", val: "+2.1%", tone: "info" },
];

function OptPage() {
  return (
    <AppShell
      title="MDO Optimization"
      subtitle="Multidisciplinary optimization powered by OpenMDAO"
      actions={
        <Button size="sm" className="bg-primary text-primary-foreground">
          <Play className="mr-1 h-4 w-4" /> Run Sweep
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {objectives.map((o) => (
          <Card key={o.k} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Sparkles className="h-4 w-4 text-primary" />
                <Badge
                  variant="outline"
                  className={`text-[0.65rem] ${o.tone === "success" ? "border-success/40 text-success" : "border-info/40 text-info"}`}
                >
                  {o.val}
                </Badge>
              </div>
              <div className="mt-2 text-sm">{o.k}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Convergence History</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <LineChart data={history}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="it" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="obj"
                  name="Objective"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="c1"
                  name="Constraint violation"
                  stroke="var(--color-destructive)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Design Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { k: "Wing span", v: 68 },
              { k: "Sweep angle", v: 42 },
              { k: "AR", v: 81 },
              { k: "Cruise Mach", v: 74 },
              { k: "Thrust", v: 56 },
              { k: "Wing loading", v: 63 },
            ].map((d) => (
              <div key={d.k}>
                <div className="flex justify-between text-xs">
                  <span>{d.k}</span>
                  <span className="font-mono text-primary">{d.v}%</span>
                </div>
                <Progress value={d.v} className="h-1.5 mt-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
