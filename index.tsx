import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Play,
  Sparkles,
  Cpu,
  Wind,
  Cog,
  Bot,
  ArrowRight,
  ShieldCheck,
  Globe2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-primary/20 blur-[120px]" />

      {/* Floating particles */}
      <Particles />

      {/* Nav */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent glow-primary">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">IA-NASA-MDO</div>
            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Aerospace Suite
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#capabilities" className="hover:text-foreground transition">
            Capabilities
          </a>
          <a href="#stack" className="hover:text-foreground transition">
            Stack
          </a>
          <a href="#mission" className="hover:text-foreground transition">
            Mission
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
              Launch platform
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-12 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3 w-3" />
              First AI-native MDO platform built in Africa
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">
              Design the <span className="gradient-text">Next Generation</span> of Aircraft with AI
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground lg:text-lg">
              A cloud-native aircraft design and multidisciplinary optimization platform integrating
              AI, CFD, OpenMDAO, OpenVSP, OpenFOAM, JSBSim, and Digital Twins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:opacity-90 glow-primary"
                >
                  Start Designing <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-border/60 backdrop-blur">
                <Play className="mr-1 h-4 w-4" /> Watch Demo
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Metric value="12+" label="Disciplines" />
              <Metric value="99.9%" label="Uptime SLA" />
              <Metric value="ISO" label="27001 ready" />
            </div>
          </div>

          {/* Aircraft wireframe */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />
            <div className="relative glass-card rounded-3xl p-6 lg:p-8 animate-float-slow">
              <AircraftWireframe />
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <TelemetryChip label="MACH" value="0.82" />
                <TelemetryChip label="ALT" value="38,000 ft" />
                <TelemetryChip label="L/D" value="19.4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Capabilities</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
            One platform. Every discipline.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Capability
            icon={Cog}
            title="Conceptual Design"
            text="Configure wing, tail, fuselage, gear, engines and control surfaces visually."
          />
          <Capability
            icon={Wind}
            title="Aerodynamics & CFD"
            text="Lift, drag, pressure and flow visualization powered by OpenFOAM."
          />
          <Capability
            icon={Sparkles}
            title="MDO Optimization"
            text="Multidisciplinary optimization on OpenMDAO for weight, fuel and range."
          />
          <Capability
            icon={Cpu}
            title="Digital Twin"
            text="Real-time sensor telemetry, predictive maintenance and engine health."
          />
          <Capability
            icon={Bot}
            title="AI Assistant"
            text="Engineering copilot for sizing, trade studies and design reasoning."
          />
          <Capability
            icon={ShieldCheck}
            title="Enterprise-Grade"
            text="SSO, RBAC, audit trails and secure cloud deployment."
          />
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="glass-card rounded-2xl p-8 lg:p-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">
            Powered by open aerospace
          </div>
          <h2 className="mt-2 text-2xl font-semibold lg:text-3xl">
            Integrated with the industry's proven solvers
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm font-mono text-muted-foreground">
            {[
              "OpenMDAO",
              "OpenVSP",
              "OpenFOAM",
              "JSBSim",
              "SU2",
              "NVIDIA Modulus",
              "PyTorch",
              "AVL",
            ].map((s) => (
              <span key={s} className="hover:text-primary transition">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Globe2 className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight lg:text-4xl max-w-2xl">
              Built in Africa. Designed for the world's aerospace pioneers.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Enterprise engineering software used by design teams targeting the standards of
              Airbus, Boeing, NASA, Lockheed Martin, Embraer, Dassault Aviation and Rolls-Royce.
            </p>
          </div>
          <div className="flex items-end">
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                Open the platform <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/40 px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} IA-NASA-MDO. All rights reserved.</div>
          <div className="font-mono">v1.0.0 · production</div>
        </div>
      </footer>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold gradient-text">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function TelemetryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-2">
      <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-sm text-primary">{value}</div>
    </div>
  );
}

function Capability({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Cog;
  title: string;
  text: string;
}) {
  return (
    <div className="group glass-card rounded-xl p-6 transition hover:border-primary/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function AircraftWireframe() {
  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto" role="img" aria-label="Aircraft wireframe">
      <defs>
        <linearGradient id="wire" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.16 210)" />
          <stop offset="1" stopColor="oklch(0.55 0.20 265)" />
        </linearGradient>
        <linearGradient id="glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.16 210 / 0.4)" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Airflow lines */}
      {[80, 120, 160, 200, 240].map((y, i) => (
        <path
          key={y}
          d={`M -50 ${y} Q 250 ${y - 20} 550 ${y}`}
          stroke="oklch(0.78 0.16 210 / 0.4)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 400"
          className="animate-airflow"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      {/* Fuselage */}
      <ellipse
        cx="250"
        cy="160"
        rx="180"
        ry="18"
        fill="none"
        stroke="url(#wire)"
        strokeWidth="1.5"
      />
      <ellipse cx="250" cy="160" rx="180" ry="18" fill="url(#glow)" opacity="0.3" />

      {/* Wings */}
      <path
        d="M 250 155 L 120 210 L 200 210 L 260 168 Z"
        fill="url(#wire)"
        fillOpacity="0.15"
        stroke="url(#wire)"
        strokeWidth="1.5"
      />
      <path
        d="M 250 155 L 380 210 L 300 210 L 240 168 Z"
        fill="url(#wire)"
        fillOpacity="0.15"
        stroke="url(#wire)"
        strokeWidth="1.5"
      />

      {/* Tail */}
      <path
        d="M 415 160 L 430 130 L 445 160 Z"
        fill="url(#wire)"
        fillOpacity="0.2"
        stroke="url(#wire)"
        strokeWidth="1.5"
      />
      <path
        d="M 405 160 L 445 175 L 430 160 Z"
        fill="url(#wire)"
        fillOpacity="0.2"
        stroke="url(#wire)"
        strokeWidth="1.5"
      />

      {/* Engines */}
      <ellipse cx="170" cy="205" rx="18" ry="6" fill="none" stroke="url(#wire)" strokeWidth="1.5" />
      <ellipse cx="330" cy="205" rx="18" ry="6" fill="none" stroke="url(#wire)" strokeWidth="1.5" />

      {/* Cockpit windows */}
      <path
        d="M 72 158 L 90 152 L 110 155 L 105 165 L 80 165 Z"
        fill="none"
        stroke="url(#wire)"
        strokeWidth="1"
      />

      {/* Reference points */}
      {[
        { x: 120, y: 210, l: "WING TIP" },
        { x: 430, y: 130, l: "VERT STAB" },
        { x: 170, y: 205, l: "ENG 1" },
      ].map((p) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="3" fill="oklch(0.78 0.16 210)" />
          <circle
            cx={p.x}
            cy={p.y}
            r="8"
            fill="none"
            stroke="oklch(0.78 0.16 210 / 0.5)"
            strokeWidth="0.5"
          >
            <animate attributeName="r" values="3;12;3" dur="2.5s" repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={p.x + 12}
            y={p.y + 3}
            fill="oklch(0.78 0.16 210)"
            fontSize="7"
            fontFamily="monospace"
          >
            {p.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Particles() {
  const particles = Array.from({ length: 25 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = 1 + Math.random() * 2;
        const left = Math.random() * 100;
        const top = 20 + Math.random() * 60;
        const dx = -100 - Math.random() * 300;
        const dy = -50 + Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 8;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: "0 0 8px oklch(0.78 0.16 210)",
              animation: `particle-drift ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              // @ts-expect-error CSS custom props
              "--dx": `${dx}px`,
              "--dy": `${dy}px`,
            }}
          />
        );
      })}
    </div>
  );
}
