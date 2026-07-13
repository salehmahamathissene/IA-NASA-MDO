import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plane, Save } from "lucide-react";

export const Route = createFileRoute("/_shell/projects")({
  component: ProjectsPage,
});

const existing = [
  {
    name: "Baobab-A320",
    mfr: "IA-NASA",
    pax: 180,
    mtow: "78 t",
    range: "6,100 km",
    status: "Active",
  },
  {
    name: "Sahel-Jet",
    mfr: "IA-NASA",
    pax: 90,
    mtow: "42 t",
    range: "4,200 km",
    status: "Optimizing",
  },
  {
    name: "Kilimanjaro Regional",
    mfr: "IA-NASA",
    pax: 72,
    mtow: "28 t",
    range: "2,800 km",
    status: "Draft",
  },
  {
    name: "Serengeti-UAV",
    mfr: "IA-NASA",
    pax: 0,
    mtow: "1.2 t",
    range: "3,500 km",
    status: "Live twin",
  },
];

function ProjectsPage() {
  return (
    <AppShell
      title="Aircraft Projects"
      subtitle="Define, catalog and version your aircraft design initiatives"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        {/* Create form */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">New Aircraft Project</h2>
            </div>
            <form className="grid gap-4 sm:grid-cols-2">
              <Field label="Aircraft Name" placeholder="e.g. Baobab-A320" />
              <Field label="Manufacturer" placeholder="IA-NASA" />
              <Field label="Passenger Capacity" type="number" placeholder="180" />
              <Field label="Crew" type="number" placeholder="4" />
              <Field label="Max Takeoff Weight (t)" type="number" placeholder="78" />
              <Field label="Cruise Speed (Mach)" type="number" placeholder="0.82" />
              <Field label="Range (km)" type="number" placeholder="6100" />
              <Field label="Runway Length (m)" type="number" placeholder="2400" />
              <SelectField label="Wing Type" options={["Low", "Mid", "High", "Delta", "Swept"]} />
              <SelectField
                label="Engine Type"
                options={["Turbofan", "Turboprop", "Electric", "Hybrid"]}
              />
              <div className="sm:col-span-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Mission Profile
                </Label>
                <Textarea
                  className="mt-1.5 bg-muted/40"
                  rows={3}
                  placeholder="Regional short-haul, hot-and-high African airports, 2-hour turnaround…"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary text-primary-foreground">
                  <Save className="mr-1 h-4 w-4" /> Save Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing */}
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Existing projects
          </div>
          <div className="grid gap-3">
            {existing.map((p) => (
              <Card key={p.name} className="glass-card transition hover:border-primary/40">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Plane className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{p.name}</span>
                      <Badge variant="outline" className="text-[0.65rem]">
                        {p.status}
                      </Badge>
                    </div>
                    <div className="mt-1 grid grid-cols-4 gap-3 text-xs text-muted-foreground">
                      <span>
                        PAX <span className="text-foreground font-mono">{p.pax}</span>
                      </span>
                      <span>
                        MTOW <span className="text-foreground font-mono">{p.mtow}</span>
                      </span>
                      <span>
                        Range <span className="text-foreground font-mono">{p.range}</span>
                      </span>
                      <span>{p.mfr}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      <Input className="mt-1.5 bg-muted/40" {...props} />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      <Select>
        <SelectTrigger className="mt-1.5 bg-muted/40">
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
