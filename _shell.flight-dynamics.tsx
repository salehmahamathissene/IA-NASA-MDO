import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_shell/flight-dynamics")({
  component: FDPage,
});

const phases = [
  { p: "Takeoff", d: "V₁ 138 kt · Vr 145 kt · V₂ 152 kt", tone: "text-info" },
  { p: "Climb", d: "ROC 2,400 fpm · IAS 290 kt / M0.78", tone: "text-success" },
  { p: "Cruise", d: "M 0.82 · FL380 · SR 0.13 nm/kg", tone: "text-primary" },
  { p: "Descent", d: "IAS 280 kt · -1,800 fpm", tone: "text-warning" },
  { p: "Landing", d: "Vref 138 kt · flap 40°", tone: "text-info" },
];

const derivs = [
  { d: "Cₗβ", v: "-0.098", desc: "Roll-yaw stability" },
  { d: "Cₙβ", v: "+0.142", desc: "Directional stability" },
  { d: "Cₘα", v: "-1.24", desc: "Longitudinal stability" },
  { d: "CLα", v: "+5.6 /rad", desc: "Lift curve slope" },
  { d: "Cₙᵣ", v: "-0.28", desc: "Yaw damping" },
  { d: "Cₗₚ", v: "-0.45", desc: "Roll damping" },
];

function FDPage() {
  return (
    <AppShell
      title="Flight Dynamics"
      subtitle="Stability, control derivatives and flight-phase envelopes · JSBSim ready"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Flight Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {phases.map((p) => (
              <div key={p.p} className="rounded-md border border-border/40 bg-background/40 p-3">
                <div className={`text-sm font-semibold ${p.tone}`}>{p.p}</div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">{p.d}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Stability & Control Derivatives</CardTitle>
            <Badge variant="outline" className="text-[0.65rem]">
              Small-perturbation · linear
            </Badge>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {derivs.map((d) => (
              <div key={d.d} className="rounded-md border border-border/40 bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-primary">{d.d}</span>
                  <span className="font-mono text-sm">{d.v}</span>
                </div>
                <div className="text-[0.65rem] text-muted-foreground mt-1">{d.desc}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
