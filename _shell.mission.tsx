import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Cloud, Fuel, Route as RouteIcon } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export const Route = createFileRoute("/_shell/mission")({
  component: MissionPage,
});

const profile = [
  { t: 0, alt: 0, phase: "Taxi" },
  { t: 5, alt: 0, phase: "Takeoff" },
  { t: 15, alt: 12000, phase: "Climb" },
  { t: 35, alt: 38000, phase: "Cruise" },
  { t: 180, alt: 38000, phase: "Cruise" },
  { t: 210, alt: 15000, phase: "Descent" },
  { t: 225, alt: 0, phase: "Approach" },
  { t: 230, alt: 0, phase: "Landing" },
];

function MissionPage() {
  return (
    <AppShell
      title="Mission Designer"
      subtitle="Interactive mission planning with segmented flight profile"
    >
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Mission Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <SliderField
              label="Payload (t)"
              min={0}
              max={30}
              step={0.5}
              defaultValue={18}
              icon={Plane}
            />
            <SliderField
              label="Range (km)"
              min={500}
              max={15000}
              step={100}
              defaultValue={6100}
              icon={RouteIcon}
            />
            <SliderField
              label="Cruise Altitude (ft)"
              min={10000}
              max={45000}
              step={1000}
              defaultValue={38000}
              icon={Cloud}
            />
            <SliderField
              label="Cruise Mach"
              min={0.4}
              max={0.92}
              step={0.01}
              defaultValue={0.82}
              icon={Plane}
            />
            <SliderField
              label="Fuel Reserve (%)"
              min={0}
              max={30}
              step={1}
              defaultValue={8}
              icon={Fuel}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Origin ICAO</Label>
                <Input className="mt-1.5 bg-muted/40 font-mono" defaultValue="DNMM" />
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Dest. ICAO</Label>
                <Input className="mt-1.5 bg-muted/40 font-mono" defaultValue="HAAB" />
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">OAT (°C)</Label>
                <Input className="mt-1.5 bg-muted/40" defaultValue="+34" />
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">QNH (hPa)</Label>
                <Input className="mt-1.5 bg-muted/40" defaultValue="1013" />
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground">Simulate Mission</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Flight Profile</CardTitle>
              <Badge variant="outline" className="text-[0.65rem]">
                Estimated fuel burn: 14.8 t
              </Badge>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer>
                <AreaChart data={profile}>
                  <defs>
                    <linearGradient id="alt" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="1" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
                  <XAxis
                    dataKey="t"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    label={{
                      value: "time (min)",
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                      position: "insideBottom",
                      offset: -3,
                    }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    label={{
                      value: "alt (ft)",
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ReTooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="alt"
                    stroke="var(--color-primary)"
                    fill="url(#alt)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Mission Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.map((p, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-[110px] rounded-lg border border-border/40 bg-background/40 px-3 py-2"
                  >
                    <div className="text-[0.6rem] uppercase text-muted-foreground">T+{p.t}min</div>
                    <div className="text-sm font-medium mt-0.5">{p.phase}</div>
                    <div className="text-xs text-primary font-mono">
                      {p.alt.toLocaleString()} ft
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function SliderField({
  label,
  min,
  max,
  step,
  defaultValue,
  icon: Icon,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  icon: typeof Plane;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
          <Icon className="h-3.5 w-3.5" /> {label}
        </div>
        <span className="font-mono text-sm text-primary">{defaultValue}</span>
      </div>
      <Slider min={min} max={max} step={step} defaultValue={[defaultValue]} className="mt-3" />
    </div>
  );
}
