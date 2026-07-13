import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/_shell/propulsion")({
  component: PropPage,
});

const engines = [
  {
    name: "IA-TF34K High-Bypass Turbofan",
    thrust: "34,000 lbf",
    bpr: "10.5",
    tsfc: "0.548",
    tone: "Recommended",
  },
  {
    name: "PW1500G Geared Turbofan",
    thrust: "24,000 lbf",
    bpr: "12.0",
    tsfc: "0.510",
    tone: "Candidate",
  },
  {
    name: "TP-9 Advanced Turboprop",
    thrust: "5,100 shp",
    bpr: "—",
    tsfc: "0.410",
    tone: "Regional",
  },
  {
    name: "Hybrid-Electric IA-H2",
    thrust: "12,000 lbf",
    bpr: "—",
    tsfc: "—",
    tone: "Experimental",
  },
];

function PropPage() {
  return (
    <AppShell title="Propulsion" subtitle="Engine trade studies and cycle analysis">
      <div className="grid gap-3 lg:grid-cols-2">
        {engines.map((e) => (
          <Card key={e.name} className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning/15 text-warning">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Cycle deck · sea-level static
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-[0.65rem]">
                  {e.tone}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-md border border-border/40 bg-background/40 p-2">
                  <div className="text-[0.6rem] uppercase text-muted-foreground">Thrust</div>
                  <div className="font-mono text-primary">{e.thrust}</div>
                </div>
                <div className="rounded-md border border-border/40 bg-background/40 p-2">
                  <div className="text-[0.6rem] uppercase text-muted-foreground">BPR</div>
                  <div className="font-mono text-primary">{e.bpr}</div>
                </div>
                <div className="rounded-md border border-border/40 bg-background/40 p-2">
                  <div className="text-[0.6rem] uppercase text-muted-foreground">TSFC</div>
                  <div className="font-mono text-primary">{e.tsfc}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
