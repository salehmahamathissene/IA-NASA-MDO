import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_shell/configuration")({
  component: ConfigPage,
});

const components = [
  { id: "wing", label: "Wing", desc: "Swept low-mounted, AR 10.3" },
  { id: "tail", label: "Tail", desc: "Conventional empennage" },
  { id: "fuselage", label: "Fuselage", desc: "Semi-monocoque, 6-abreast" },
  { id: "gear", label: "Landing Gear", desc: "Tricycle, retractable" },
  { id: "engine", label: "Engine Placement", desc: "2× underwing turbofan" },
  { id: "fuel", label: "Fuel Tanks", desc: "Wing + center tank, 24 t" },
  { id: "controls", label: "Control Surfaces", desc: "Fly-by-wire, ailerons+flaperons" },
];

function ConfigPage() {
  return (
    <AppShell
      title="Aircraft Configuration"
      subtitle="Visual designer for airframe components and geometry"
    >
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {components.map((c) => (
              <button
                key={c.id}
                className="w-full text-left rounded-md border border-border/40 bg-background/40 p-3 hover:border-primary/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.label}</span>
                  <Badge variant="outline" className="text-[0.6rem]">
                    Config
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">3D View · Baobab-A320</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Top
              </Button>
              <Button variant="outline" size="sm">
                Side
              </Button>
              <Button variant="outline" size="sm">
                Iso
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg border border-border/40 grid-bg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
                <AircraftBlueprint />
              </div>
              <div className="absolute top-3 left-3 text-[0.65rem] font-mono text-muted-foreground">
                REF: BAOBAB-A320 · SCALE 1:200
              </div>
              <div className="absolute bottom-3 right-3 flex gap-2 text-[0.65rem] font-mono text-primary">
                <span>X: 0.00</span>
                <span>Y: 0.00</span>
                <span>Z: 38.4</span>
              </div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan" />
            </div>

            <Tabs defaultValue="geo" className="mt-4">
              <TabsList>
                <TabsTrigger value="geo">Geometry</TabsTrigger>
                <TabsTrigger value="mat">Materials</TabsTrigger>
                <TabsTrigger value="sys">Systems</TabsTrigger>
              </TabsList>
              <TabsContent value="geo" className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  ["Span", "34.10 m"],
                  ["Length", "37.57 m"],
                  ["Height", "11.76 m"],
                  ["Wing Area", "122.6 m²"],
                  ["Aspect Ratio", "10.3"],
                  ["Sweep", "25°"],
                  ["Taper", "0.24"],
                  ["Dihedral", "5.1°"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-border/40 bg-background/40 p-3">
                    <div className="text-[0.6rem] uppercase text-muted-foreground">{k}</div>
                    <div className="font-mono text-primary">{v}</div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="mat" className="mt-4 text-sm text-muted-foreground">
                CFRP wing box · Aluminum-lithium fuselage skins · Titanium fasteners.
              </TabsContent>
              <TabsContent value="sys" className="mt-4 text-sm text-muted-foreground">
                Fly-by-wire · Bleedless architecture · 540 kVA electrical.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function AircraftBlueprint() {
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto">
      <defs>
        <linearGradient id="bp" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.78 0.16 210)" />
          <stop offset="1" stopColor="oklch(0.55 0.20 265)" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="100" rx="240" ry="14" fill="none" stroke="url(#bp)" strokeWidth="1.5" />
      <path
        d="M 300 95 L 130 145 L 220 145 L 315 105 Z"
        fill="url(#bp)"
        fillOpacity="0.15"
        stroke="url(#bp)"
      />
      <path
        d="M 300 95 L 470 145 L 380 145 L 285 105 Z"
        fill="url(#bp)"
        fillOpacity="0.15"
        stroke="url(#bp)"
      />
      <path
        d="M 500 100 L 520 65 L 540 100 Z"
        fill="url(#bp)"
        fillOpacity="0.2"
        stroke="url(#bp)"
      />
      <ellipse cx="180" cy="140" rx="20" ry="6" fill="none" stroke="url(#bp)" />
      <ellipse cx="420" cy="140" rx="20" ry="6" fill="none" stroke="url(#bp)" />
    </svg>
  );
}
