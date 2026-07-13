import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Library,
  Route as RouteIcon,
  Cog,
  Wind,
  Layers3,
  FlaskConical,
  Plane,
  Activity,
  Scale,
  Fuel,
  Flame,
  Sparkles,
  Cpu,
  Bot,
  FileText,
  Settings,
  Rocket,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const workspace = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Aircraft Projects", url: "/projects", icon: FolderKanban },
  { title: "Aircraft Library", url: "/library", icon: Library },
  { title: "Mission Designer", url: "/mission", icon: RouteIcon },
  { title: "Configuration", url: "/configuration", icon: Cog },
];

const analysis = [
  { title: "Aerodynamics", url: "/aerodynamics", icon: Wind },
  { title: "Structures", url: "/structures", icon: Layers3 },
  { title: "CFD Laboratory", url: "/cfd", icon: FlaskConical },
  { title: "Flight Dynamics", url: "/flight-dynamics", icon: Plane },
  { title: "Performance", url: "/performance", icon: Activity },
  { title: "Weight & Balance", url: "/weight-balance", icon: Scale },
  { title: "Fuel Analysis", url: "/fuel", icon: Fuel },
  { title: "Propulsion", url: "/propulsion", icon: Flame },
];

const intelligence = [
  { title: "Optimization", url: "/optimization", icon: Sparkles },
  { title: "Digital Twin", url: "/digital-twin", icon: Cpu },
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) => currentPath === path;

  const renderGroup = (label: string, items: typeof workspace) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className="data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:border-l-2 data-[active=true]:border-primary rounded-md"
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3 px-2 py-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent glow-primary">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold tracking-tight">IA-NASA-MDO</span>
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Aerospace Suite
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        {renderGroup("Workspace", workspace)}
        {renderGroup("Analysis", analysis)}
        {renderGroup("Intelligence", intelligence)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            AE
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Aerospace Engineer</span>
            <span className="text-[0.65rem] text-muted-foreground">Enterprise plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
