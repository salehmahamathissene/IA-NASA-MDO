import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip } from "recharts";

export const Route = createFileRoute("/_shell/weight-balance")({
  component: WBPage,
});

const groups = [
  { name: "Structure", v: 9800, c: "var(--color-chart-1)" },
  { name: "Powerplant", v: 5600, c: "var(--color-chart-2)" },
  { name: "Systems", v: 4200, c: "var(--color-chart-3)" },
  { name: "Furnishing", v: 3100, c: "var(--color-chart-4)" },
  { name: "Payload", v: 18000, c: "var(--color-chart-5)" },
  { name: "Fuel", v: 24000, c: "var(--color-primary)" },
];

const total = groups.reduce((a, g) => a + g.v, 0);

function WBPage() {
  return (
    <AppShell title="Weight & Balance" subtitle="Mass breakdown, MTOW allocation and CG envelope">
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Mass Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={groups}
                  dataKey="v"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={2}
                >
                  {groups.map((g) => (
                    <Cell key={g.name} fill={g.c} stroke="var(--color-background)" />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-40 pointer-events-none">
              <div className="text-xs uppercase text-muted-foreground">MTOW</div>
              <div className="font-semibold gradient-text text-lg">
                {(total / 1000).toFixed(1)} t
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Group Weights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {groups.map((g) => (
              <div key={g.name}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: g.c }} />
                    <span>{g.name}</span>
                  </div>
                  <span className="font-mono text-primary">{g.v.toLocaleString()} kg</span>
                </div>
                <Progress value={(g.v / total) * 100} className="h-1.5 mt-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">CG Envelope (% MAC)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-40 rounded-lg border border-border/40 grid-bg overflow-hidden">
              <svg viewBox="0 0 800 160" className="w-full h-full">
                <path
                  d="M 100 30 L 700 30 L 720 130 L 80 130 Z"
                  fill="oklch(0.72 0.17 155 / 0.15)"
                  stroke="oklch(0.72 0.17 155)"
                />
                <path
                  d="M 400 30 L 400 130"
                  stroke="oklch(0.78 0.16 210)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="400" cy="80" r="6" fill="oklch(0.78 0.16 210)" />
                <text
                  x="410"
                  y="85"
                  fill="oklch(0.78 0.16 210)"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  CG 24.6% MAC
                </text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
