import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_shell/structures")({
  component: StructuresPage,
});

const parts = [
  { name: "Wing Box (CFRP)", load: 78, margin: "+0.42", status: "OK" },
  { name: "Center Fuselage Frame", load: 62, margin: "+0.68", status: "OK" },
  { name: "Empennage Attachment", load: 88, margin: "+0.12", status: "Watch" },
  { name: "Landing Gear Beam", load: 71, margin: "+0.34", status: "OK" },
  { name: "Wing-Fuselage Fitting", load: 92, margin: "+0.05", status: "Watch" },
];

function StructuresPage() {
  return (
    <AppShell title="Structures" subtitle="FEA load cases, stress margins and material utilization">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[
          { k: "Ultimate Load Factor", v: "3.75 g" },
          { k: "Structural Weight", v: "9.8 t" },
          { k: "Min Reserve Factor", v: "1.05" },
        ].map((s) => (
          <Card key={s.k} className="glass-card">
            <CardContent className="p-4">
              <div className="text-xs uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-2xl font-semibold gradient-text">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Critical Components — Load Margins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parts.map((p) => (
            <div key={p.name} className="rounded-md border border-border/40 bg-background/40 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[0.65rem] ${p.status === "Watch" ? "border-warning/40 text-warning" : "border-success/40 text-success"}`}
                  >
                    {p.status}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">MoS {p.margin}</span>
                </div>
              </div>
              <Progress value={p.load} className="h-1.5 mt-2" />
              <div className="mt-1 text-[0.65rem] text-muted-foreground">Utilization {p.load}%</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
