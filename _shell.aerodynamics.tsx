import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_shell/aerodynamics")({
  component: AeroPage,
});

const polar = Array.from({ length: 40 }, (_, i) => {
  const cl = -0.5 + i * 0.05;
  const cd = 0.018 + 0.045 * cl * cl;
  return { cl: +cl.toFixed(2), cd: +cd.toFixed(4) };
});

const mach = Array.from({ length: 30 }, (_, i) => {
  const m = 0.3 + i * 0.02;
  const cd = 0.024 + (m > 0.78 ? Math.pow(m - 0.78, 2) * 3 : 0);
  return { m: +m.toFixed(2), cd: +cd.toFixed(4) };
});

function AeroPage() {
  return (
    <AppShell
      title="Aerodynamics"
      subtitle="Lift, drag, pressure distribution and flow visualization"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { k: "CL max", v: "1.62", d: "Clean config" },
          { k: "CD₀", v: "0.0184", d: "Parasite drag" },
          { k: "L/D max", v: "19.4", d: "@ CL 0.58" },
          { k: "M crit", v: "0.82", d: "Drag divergence" },
        ].map((s) => (
          <Card key={s.k} className="glass-card">
            <CardContent className="p-4">
              <div className="text-xs uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-2xl font-semibold gradient-text">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.d}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Drag Polar (CL vs CD)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis
                  dataKey="cd"
                  type="number"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                />
                <YAxis
                  dataKey="cl"
                  type="number"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                />
                <ZAxis range={[40, 40]} />
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Scatter data={polar} fill="var(--color-chart-1)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Mach Sweep — Wave Drag Onset</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <LineChart data={mach}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cd"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Pressure Distribution — Wing Section</CardTitle>
            <Badge variant="outline" className="text-[0.65rem]">
              RANS · SA turbulence
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 rounded-lg border border-border/40 grid-bg overflow-hidden">
              <svg viewBox="0 0 800 200" className="w-full h-full">
                <defs>
                  <linearGradient id="cp" x1="0" x2="1">
                    <stop offset="0" stopColor="oklch(0.62 0.22 25)" />
                    <stop offset="0.5" stopColor="oklch(0.78 0.17 75)" />
                    <stop offset="1" stopColor="oklch(0.72 0.17 155)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 100 Q 200 40 400 80 T 700 100"
                  stroke="url(#cp)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 100 100 Q 300 130 500 120 T 700 100"
                  stroke="oklch(0.72 0.14 220)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <text
                  x="120"
                  y="30"
                  fill="oklch(0.62 0.22 25)"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  Cp upper
                </text>
                <text
                  x="120"
                  y="180"
                  fill="oklch(0.72 0.14 220)"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  Cp lower
                </text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
