import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "recharts";
import { Activity, Cpu, Wrench, Zap } from "lucide-react";

export const Route = createFileRoute("/_shell/digital-twin")({
  component: TwinPage,
});

const engineHealth = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  egt: 720 + Math.sin(i / 3) * 10 + i * 0.4,
  vibe: 0.6 + Math.abs(Math.sin(i / 5)) * 0.4,
}));

function TwinPage() {
  return (
    <AppShell
      title="Digital Twin"
      subtitle="Live telemetry, sensor fusion and predictive maintenance for the operational fleet"
      actions={
        <Badge variant="outline" className="border-success/40 text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success mr-1.5 animate-pulse" /> LIVE
        </Badge>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {[
          { k: "Aircraft Health", v: "96%", i: Activity, tone: "text-success" },
          { k: "Engine #1 Health", v: "94%", i: Zap, tone: "text-success" },
          { k: "Engine #2 Health", v: "87%", i: Zap, tone: "text-warning" },
          { k: "Maint. Window", v: "148 h", i: Wrench, tone: "text-info" },
        ].map((s) => (
          <Card key={s.k} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <s.i className={`h-4 w-4 ${s.tone}`} />
                <span className={`text-xl font-semibold ${s.tone}`}>{s.v}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.k}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Engine Telemetry — Serengeti-UAV</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <LineChart data={engineHealth}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={11} />
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
                  dataKey="egt"
                  name="EGT °C"
                  stroke="var(--color-chart-3)"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="vibe"
                  name="Vibration mm/s"
                  stroke="var(--color-chart-1)"
                  dot={false}
                  yAxisId={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Predictive Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { k: "Turbine blades", eta: "1,240 h", v: 22 },
              { k: "APU starter", eta: "620 h", v: 58 },
              { k: "Landing gear pin", eta: "2,100 h", v: 12 },
              { k: "FCU actuator", eta: "148 h", v: 88 },
            ].map((m) => (
              <div key={m.k}>
                <div className="flex justify-between text-xs">
                  <span>{m.k}</span>
                  <span className="font-mono text-muted-foreground">ETA {m.eta}</span>
                </div>
                <Progress value={m.v} className="h-1.5 mt-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" /> Sensor Grid
            </CardTitle>
            <Badge variant="outline" className="text-[0.65rem]">
              128 sensors · 12 Hz
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 md:grid-cols-16 gap-1.5">
              {Array.from({ length: 96 }).map((_, i) => {
                const good = Math.random() > 0.08;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded ${good ? "bg-success/20 border border-success/40" : "bg-warning/20 border border-warning/40"}`}
                    title={`Sensor #${i + 1}`}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
