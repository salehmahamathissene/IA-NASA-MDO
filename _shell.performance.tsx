import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
} from "recharts";

export const Route = createFileRoute("/_shell/performance")({
  component: PerfPage,
});

const capabilities = [
  { k: "Range", A: 88 },
  { k: "Payload", A: 74 },
  { k: "Fuel Eff.", A: 92 },
  { k: "Runway", A: 68 },
  { k: "Climb", A: 82 },
  { k: "Speed", A: 79 },
];

const takeoff = [
  { alt: 0, dist: 1980 },
  { alt: 2000, dist: 2180 },
  { alt: 4000, dist: 2410 },
  { alt: 6000, dist: 2680 },
  { alt: 8000, dist: 3000 },
];

function PerfPage() {
  return (
    <AppShell
      title="Performance"
      subtitle="Mission-level performance envelope and takeoff / landing analysis"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { k: "Design Range", v: "6,100 km" },
          { k: "Cruise SR", v: "0.13 nm/kg" },
          { k: "Takeoff Roll", v: "1,980 m" },
          { k: "Landing Roll", v: "1,420 m" },
        ].map((s) => (
          <Card key={s.k} className="glass-card">
            <CardContent className="p-4">
              <div className="text-xs uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-2xl font-semibold gradient-text">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Capability Envelope</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <RadarChart data={capabilities}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="k" stroke="var(--color-muted-foreground)" fontSize={11} />
                <PolarRadiusAxis stroke="var(--color-muted-foreground)" fontSize={10} />
                <Radar
                  dataKey="A"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Takeoff Distance vs Airport Elevation</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <BarChart data={takeoff}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="alt" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <ReTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="dist" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
