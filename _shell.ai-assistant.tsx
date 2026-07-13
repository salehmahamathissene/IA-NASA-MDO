import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, User, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_shell/ai-assistant")({
  component: AIPage,
});

const seeds = [
  "Design a regional aircraft for Africa.",
  "Optimize fuel consumption.",
  "Compare turbofan vs turboprop.",
  "Estimate MTOW for a 90-pax jet.",
  "Improve L/D ratio by 10%.",
];

type Msg = { role: "user" | "ai"; text: string; refs?: string[]; chart?: boolean };

const initial: Msg[] = [
  {
    role: "ai",
    text: "Welcome, engineer. I'm your MDO copilot. Ask me about sizing, trade studies, aerodynamics, propulsion or optimization objectives.",
  },
];

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    const aiMsg: Msg = {
      role: "ai",
      text: "Based on your target mission and current constraints, I recommend a swept low-wing turbofan configuration with AR ≈ 10, cruise Mach 0.78 and MTOW ≈ 42 t. Expected L/D ≈ 18.6, block fuel savings ≈ 6.2%.",
      refs: ["Raymer §5.3", "Torenbeek 2013", "NASA/TM-2018-219884"],
      chart: true,
    };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <AppShell
      title="AI Design Assistant"
      subtitle="Engineering copilot for conceptual design, sizing and optimization reasoning"
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
        <Card className="glass-card flex flex-col h-[calc(100vh-220px)]">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === "ai" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`}
                >
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-2xl rounded-lg px-4 py-3 ${m.role === "ai" ? "bg-muted/40 border border-border/40" : "bg-primary/15 border border-primary/30"}`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  {m.chart && (
                    <div className="mt-3 rounded-md border border-border/40 bg-background/60 p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <BarChart3 className="h-3.5 w-3.5" /> Performance estimate
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <MiniStat k="MTOW" v="42.1 t" />
                        <MiniStat k="L/D" v="18.6" />
                        <MiniStat k="Block fuel" v="-6.2%" />
                      </div>
                    </div>
                  )}
                  {m.refs && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.refs.map((r) => (
                        <Badge key={r} variant="outline" className="text-[0.6rem]">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t border-border/40 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask about sizing, drag, propulsion, MDO objectives…"
                className="bg-muted/40"
              />
              <Button onClick={() => send(input)} className="bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-[0.65rem] text-muted-foreground">
              Future integration: OpenAI · Anthropic Claude · NVIDIA AI Enterprise
            </div>
          </div>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Try a prompt
            </div>
            {seeds.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full text-left rounded-md border border-border/40 bg-background/40 p-3 text-sm hover:border-primary/40 transition"
              >
                {s}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function MiniStat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded border border-border/40 bg-background/40 px-2 py-1">
      <div className="text-[0.55rem] uppercase text-muted-foreground">{k}</div>
      <div className="font-mono text-primary">{v}</div>
    </div>
  );
}
