import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

interface SimulationItem {
  id: number;
  project_name: string;
  type: string;
  status: string;
}

interface DashboardStats {
  total_projects: number;
  total_simulations: number;
  aircraft_configurations: number;
  optimization_runs: number;
  ai_recommendations: number;
  digital_twins: number;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Trajectory not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested flight path doesn't exist in the IA-NASA-MDO airspace.
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">System anomaly detected</h1>
        <p className="mt-2 text-sm text-muted-foreground">Telemetry indicates an unexpected fault.</p>
        <div className="mt-6">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IA-NASA-MDO — Intelligent Aircraft Design Platform" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body className="bg-[#0b0f19] text-slate-100"><QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider><Scripts /></body>
    </html>
  );
}

export function RootComponent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [queue, setQueue] = useState<SimulationItem[]>([]);
  const [errorLog, setErrorLog] = useState<string | null>(
    "Database Restriction: ORA-20001: \"SALEHMAHAMATHISSE_SCHEMA_1VK72\".\"TRG_BLOCK_WEEKDAY_OPS\" failed. UNILAK SECURITY EXAM RULE: Database modifications are completely restricted during weekdays and public holidays."
  );
  
  // Expanded Navigation Module State
  const [currentModule, setCurrentModule] = useState<"dashboard" | "mission_designer" | "projects" | "cfd" | "ai">("mission_designer");

  // Mission State Input Controls
  const [payload, setPayload] = useState("18");
  const [range, setRange] = useState("6100");
  const [altitude, setAltitude] = useState("38000");
  const [mach, setMach] = useState("0.82");
  const [reserve, setReserve] = useState("8");

  const fetchDashboardData = () => {
    fetch('http://127.0.0.1:8000/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => console.log("Using telemetry fallbacks..."));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen text-slate-100 font-sans antialiased bg-[#0b0f19]">
      
      {/* PROFESSIONAL SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0d1322] border-r border-slate-800 p-5 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs text-white">M</div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white leading-none">IA-NASA-MDO</h2>
              <span className="text-[10px] text-slate-400 font-mono">Aerospace Suite</span>
            </div>
          </div>
          
          <nav className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-2 mb-2">Workspace</span>
            <button onClick={() => setCurrentModule("dashboard")} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentModule === "dashboard" ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white"}`}>
              <span>📊</span> Dashboard
            </button>
            <button onClick={() => setCurrentModule("mission_designer")} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentModule === "mission_designer" ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white"}`}>
              <span>🗺️</span> Mission Designer
            </button>
            <button onClick={() => setCurrentModule("projects")} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentModule === "projects" ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white"}`}>
              <span>✈️</span> Aircraft Projects
            </button>
            <button onClick={() => setCurrentModule("cfd")} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentModule === "cfd" ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white"}`}>
              <span>🔬</span> CFD Laboratory
            </button>
            <button onClick={() => setCurrentModule("ai")} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentModule === "ai" ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white"}`}>
              <span>🤖</span> AI Assistant
            </button>
          </nav>
        </div>

        <div className="p-2.5 bg-black/20 border border-slate-800 rounded-lg flex items-center gap-2.5 text-xs">
          <div className="h-7 w-7 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-slate-200">AE</div>
          <div>
            <p className="font-medium text-slate-200 leading-none">Saleh Mahamath</p>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">Reg: 23307/2023</span>
          </div>
        </div>
      </aside>

      {/* CORE VIEWPORT MAIN PANEL */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full">
        
        {/* TOP LEVEL HEADER */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
          <div>
            <span className="text-[10px] font-mono text-blue-500 tracking-widest font-bold uppercase">MDO / {currentModule.toUpperCase().replace("_", " ")}</span>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mt-1">
              {currentModule === "dashboard" && "Mission Control Overview"}
              {currentModule === "mission_designer" && "Interactive Mission Designer"}
              {currentModule === "projects" && "Aircraft Configuration Pipeline"}
              {currentModule === "cfd" && "Fluid Dynamics Sandbox"}
              {currentModule === "ai" && "AI Copilot Core"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 bg-slate-800 text-xs font-semibold rounded-lg border border-slate-700 text-slate-200">Export Parameters</button>
          </div>
        </div>

        {/* SECURITY ALERT BANNER LOG */}
        {errorLog && (
          <div className="mb-6 p-4 bg-amber-950/20 border border-amber-900/60 rounded-xl text-xs">
            <strong className="text-amber-400 font-bold block text-sm">🔒 Security Rules Active</strong>
            <p className="mt-1 font-mono text-slate-300 leading-relaxed bg-black/40 p-3 rounded border border-slate-900">
              {errorLog}
            </p>
          </div>
        )}

        {/* DYNAMIC METRICS FOR TOP LEVEL CONTEXT */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">Total Projects</span><h3 className="text-xl font-bold mt-1 text-white">{stats ? stats.total_projects : "2"}</h3></div>
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">Configurations</span><h3 className="text-xl font-bold mt-1 text-white">87</h3></div>
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">Optimization Runs</span><h3 className="text-xl font-bold mt-1 text-white">342</h3></div>
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">CFD Simulations</span><h3 className="text-xl font-bold mt-1 text-white">3</h3></div>
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">AI Insights</span><h3 className="text-xl font-bold mt-1 text-white">1,204</h3></div>
          <div className="bg-[#131a2c] border border-slate-800 p-4 rounded-xl"><span className="text-[10px] font-mono text-slate-400 block">Digital Twins</span><h3 className="text-xl font-bold mt-1 text-white">6</h3></div>
        </div>

        {/* WORKSPACE VIEWS CONDITIONAL SWITCH */}
        {currentModule === "mission_designer" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* PARAMETER CONFIGURATION COMPONENT */}
              <div className="bg-[#131a2c] border border-slate-800/80 p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white tracking-tight border-b border-slate-800 pb-2">Segmented Flight Mission Profile</h3>
                
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Payload (t)</label>
                    <input type="number" value={payload} onChange={(e) => setPayload(e.target.value)} className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Range (km)</label>
                    <input type="number" value={range} onChange={(e) => setRange(e.target.value)} className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Cruise Altitude (ft)</label>
                    <input type="number" value={altitude} onChange={(e) => setAltitude(e.target.value)} className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Cruise Mach</label>
                    <input type="number" step="0.01" value={mach} onChange={(e) => setMach(e.target.value)} className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Fuel Reserve (%)</label>
                    <input type="number" value={reserve} onChange={(e) => setReserve(e.target.value)} className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">OAT (°C)</label>
                    <input type="number" defaultValue="15" className="w-full bg-[#0b0f19] border border-slate-800 rounded p-2 text-white font-mono" />
                  </div>
                </div>

                <button type="button" className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded text-xs text-white transition mt-2">
                  Simulate Mission Trajectory
                </button>
              </div>

              {/* MISSION PROFILE CHART DISPLAY */}
              <div className="bg-[#131a2c] border border-slate-800/80 p-5 rounded-xl xl:col-span-2 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-white tracking-tight">Segmented Flight Profile View</h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">Estimated fuel burn: 14.8 t</span>
                </div>

                {/* SVG SEGMENTED ELEVATION CHART */}
                <div className="w-full bg-black/30 border border-slate-800/80 rounded-lg p-4 relative h-48 flex flex-col justify-between">
                  <div className="absolute left-2 top-2 text-[10px] font-mono text-slate-500">alt (ft)</div>
                  <div className="absolute right-2 bottom-1 text-[10px] font-mono text-slate-500">time (min)</div>
                  
                  {/* Grid Lines */}
                  <div className="w-full h-full flex flex-col justify-between border-b border-l border-slate-800 pt-4 pb-1 pl-8 pr-4">
                    <div className="w-full border-t border-slate-800/40 text-[9px] font-mono text-slate-600 pt-0.5">38000</div>
                    <div className="w-full border-t border-slate-800/40 text-[9px] font-mono text-slate-600 pt-0.5">28500</div>
                    <div className="w-full border-t border-slate-800/40 text-[9px] font-mono text-slate-600 pt-0.5">19000</div>
                    <div className="w-full border-t border-slate-800/40 text-[9px] font-mono text-slate-600 pt-0.5">9500</div>
                    
                    {/* Mission Trajectory SVG Path */}
                    <svg className="absolute inset-0 w-full h-full p-4 pl-12 pb-6" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0 95 L 3 95 L 7 85 L 15 65 L 35 15 L 75 15 L 88 55 L 96 95 L 100 95" fill="none" stroke="#3b82f6" strokeWidth="2" />
                      <path d="M 0 95 L 3 95 L 7 85 L 15 65 L 35 15 L 75 15 L 88 55 L 96 95 L 100 95 L 100 100 L 0 100 Z" fill="url(#blue-gradient)" opacity="0.08" />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* X-Axis labels */}
                  <div className="flex justify-between pl-10 text-[9px] font-mono text-slate-500">
                    <span>0</span><span>5</span><span>15</span><span>35</span><span>180</span><span>210</span><span>225</span><span>230</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MISSION TIMELINE MILESTONES COMPONENT */}
            <div className="bg-[#131a2c] border border-slate-800/80 p-5 rounded-xl">
              <h3 className="text-sm font-bold text-white tracking-tight mb-4">Mission Timeline Segments</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                {[
                  { time: "T+0min", stage: "Taxi", alt: "0 ft", border: "border-slate-800" },
                  { time: "T+5min", stage: "Takeoff", alt: "0 ft", border: "border-blue-500/40" },
                  { time: "T+15min", stage: "Climb", alt: "12,000 ft", border: "border-blue-500/40" },
                  { time: "T+35min", stage: "Cruise", alt: "38,000 ft", border: "border-emerald-500/40" },
                  { time: "T+180min", stage: "Cruise", alt: "38,000 ft", border: "border-emerald-500/40" },
                  { time: "T+210min", stage: "Descent", alt: "15,000 ft", border: "border-purple-500/40" },
                  { time: "T+225min", stage: "Approach", alt: "0 ft", border: "border-purple-500/40" },
                  { time: "T+230min", stage: "Landing", alt: "0 ft", border: "border-slate-800" },
                ].map((step, idx) => (
                  <div key={idx} className={`bg-[#0b0f19] border ${step.border} p-3 rounded-lg text-xs`}>
                    <span className="text-[10px] font-mono text-blue-400 font-bold block">{step.time}</span>
                    <p className="font-bold text-white mt-1">{step.stage}</p>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">{step.alt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FALLBACK PLACEHOLDERS FOR COMPLEMENTARY VIEWS */}
        {currentModule === "dashboard" && (
          <div className="p-6 bg-[#131a2c] rounded-xl border border-slate-800 text-center text-sm text-slate-400">
            📊 Secondary system telemetry dash summary metrics active. Use the left workspace menu to browse design suites.
          </div>
        )}
        
        {currentModule === "projects" && (
          <div className="p-6 bg-[#131a2c] rounded-xl border border-slate-800 text-center text-sm text-slate-400">
            ✈️ Aircraft Geometry Suite & Wing Optimization Canvas.
          </div>
        )}

        {currentModule === "cfd" && (
          <div className="p-6 bg-[#131a2c] rounded-xl border border-slate-800 text-center text-sm text-slate-400">
            🔬 Navier-Stokes mesh solver and boundary layers live.
          </div>
        )}

        {currentModule === "ai" && (
          <div className="p-6 bg-[#131a2c] rounded-xl border border-slate-800 text-center text-sm text-slate-400">
            🤖 Multi-disciplinary optimization parameters analyzed via copilot inference logs.
          </div>
        )}

      </main>
    </div>
  );
}