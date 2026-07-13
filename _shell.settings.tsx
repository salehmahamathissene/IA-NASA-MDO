import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_shell/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Workspace, integrations and preferences">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs uppercase text-muted-foreground">Workspace name</Label>
              <Input className="mt-1.5 bg-muted/40" defaultValue="IA-NASA-MDO" />
            </div>
            <div>
              <Label className="text-xs uppercase text-muted-foreground">Primary units</Label>
              <Input
                className="mt-1.5 bg-muted/40"
                defaultValue="Metric (SI) · Aviation (kt, ft)"
              />
            </div>
            <div>
              <Label className="text-xs uppercase text-muted-foreground">Compute region</Label>
              <Input className="mt-1.5 bg-muted/40" defaultValue="af-south-1 · Cape Town" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Enable AI Assistant", true],
              ["Auto-run MDO on config change", false],
              ["Show CFD residual notifications", true],
              ["Enable telemetry from Digital Twins", true],
              ["Beta features", false],
            ].map(([k, v]) => (
              <div key={k as string} className="flex items-center justify-between">
                <span className="text-sm">{k}</span>
                <Switch defaultChecked={v as boolean} />
              </div>
            ))}
            <Separator />
            <div className="flex justify-end">
              <Button className="bg-primary text-primary-foreground">Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Solver Integrations</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {["OpenMDAO", "OpenVSP", "OpenFOAM", "SU2", "JSBSim", "NVIDIA Modulus"].map((s) => (
              <div
                key={s}
                className="rounded-md border border-border/40 bg-background/40 p-3 flex items-center justify-between"
              >
                <span className="font-mono text-sm">{s}</span>
                <span className="text-[0.65rem] text-success">Connected</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
