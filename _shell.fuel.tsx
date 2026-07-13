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
  Legend,
} from "recharts";

export const Route = createFileRoute("/_shell/fuel")({
  component: FuelPage,
});

const burn = Array.from({ length: 12 }, (_, i) => ({
  t: i * 20,
  burn: 4200 - i * 260 + (i > 6 ? 80 : 0),
  reserve: 2400,
}));

function FuelPage() {
  return (
    <AppShell title="Fuel Analysis" subtitle="Block fuel, specific range and reserve strategy">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {[
          ["Block Fuel", "14,820 kg"],
          ["Trip Fuel", "12,420 kg"],
          ["Reserve", "2,400 kg"],
          ["SFC (cruise)", "0.548 lb/lbf·h"],
        ].map(([k, v]) => (
          <Card key={k} className="glass-card">
            <CardContent className="p-4">
              <div className="text-xs uppercase text-muted-foreground">{k}</div>
              <div className="mt-1 text-2xl font-semibold gradient-text">{v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Fuel Burn vs Time</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <LineChart data={burn}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" />
              <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={11} unit="min" />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} unit="kg" />
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
                dataKey="burn"
                name="Fuel remaining"
                stroke="var(--color-primary)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="reserve"
                name="Reserve floor"
                stroke="var(--color-destructive)"
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AppShell>
  );
}
