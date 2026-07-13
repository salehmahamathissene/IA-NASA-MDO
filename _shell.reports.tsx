import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/_shell/reports")({
  component: ReportsPage,
});

const reports = [
  {
    title: "Aircraft Summary",
    desc: "Design overview, geometry and top-level performance",
    type: "PDF",
  },
  { title: "Weight Report", desc: "Group weights, CG envelope and MTOW allocation", type: "PDF" },
  { title: "Mission Report", desc: "Segment analysis, fuel burn and payload-range", type: "PDF" },
  {
    title: "Optimization Report",
    desc: "MDO history, active constraints, Pareto front",
    type: "Excel",
  },
  { title: "CFD Report", desc: "Solver setup, residuals, integrated coefficients", type: "PDF" },
  {
    title: "Digital Twin Log",
    desc: "Telemetry export and maintenance predictions",
    type: "Excel",
  },
];

function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="Generate PDF and Excel deliverables for reviews and certification"
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.title} className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    {r.type === "Excel" ? (
                      <FileSpreadsheet className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 max-w-xs">{r.desc}</div>
                  </div>
                </div>
                <Badge variant="outline">{r.type}</Badge>
              </div>
              <Button className="w-full mt-4 bg-primary text-primary-foreground">
                <Download className="mr-1 h-4 w-4" /> Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
