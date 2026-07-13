import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plane } from "lucide-react";

export const Route = createFileRoute("/_shell/library")({
  component: LibraryPage,
});

const library = [
  { name: "Airbus A320neo", cat: "Narrowbody", mtow: "79 t", range: "6,500 km", pax: 180 },
  { name: "Boeing 787-9", cat: "Widebody", mtow: "254 t", range: "14,010 km", pax: 296 },
  { name: "Embraer E195-E2", cat: "Regional", mtow: "61 t", range: "4,800 km", pax: 146 },
  { name: "ATR 72-600", cat: "Turboprop", mtow: "23 t", range: "1,500 km", pax: 72 },
  { name: "Bombardier CRJ-900", cat: "Regional", mtow: "38 t", range: "2,900 km", pax: 90 },
  { name: "Cessna Citation X", cat: "Business Jet", mtow: "16 t", range: "6,000 km", pax: 12 },
  { name: "NASA X-59 QueSST", cat: "Experimental", mtow: "14 t", range: "—", pax: 1 },
  { name: "Airbus A350-1000", cat: "Widebody", mtow: "319 t", range: "16,100 km", pax: 366 },
];

function LibraryPage() {
  return (
    <AppShell
      title="Aircraft Library"
      subtitle="Reference database of production and experimental airframes"
    >
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search library…" className="pl-9 bg-muted/40" />
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {library.map((a) => (
          <Card key={a.name} className="glass-card transition hover:border-primary/40">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Plane className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.cat}</div>
                  </div>
                </div>
                <Badge variant="outline">Reference</Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <Stat k="MTOW" v={a.mtow} />
                <Stat k="Range" v={a.range} />
                <Stat k="PAX" v={String(a.pax)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border/40 bg-background/40 px-2 py-1.5">
      <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-mono text-xs text-primary">{v}</div>
    </div>
  );
}
