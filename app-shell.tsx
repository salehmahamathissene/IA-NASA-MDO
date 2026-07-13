import type { ReactNode } from "react";
import { Bell, Search, Command } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, subtitle, actions, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-primary/30 text-primary">
                MDO
              </Badge>
              <span>/</span>
              <span className="font-medium text-foreground">{title}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects, models, simulations…"
                  className="h-8 w-72 pl-8 pr-16 bg-muted/40 border-border/60 text-xs"
                />
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[0.6rem] text-muted-foreground">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="px-6 py-6 lg:px-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">{title}</h1>
                  {subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
                  )}
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
