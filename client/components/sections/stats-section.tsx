import { useState, useEffect } from "react";
import { stats as defaultStats } from "@/data/portfolio";

export function StatsSection() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats || defaultStats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Keep using default stats on error
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="stats" className="relative mt-10 flex flex-col gap-8 overflow-hidden rounded-[3rem] border border-white/10 bg-card/60 p-10 text-center shadow-inner-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.12),transparent_65%)]" />
      <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary/80">
              {item.label}
            </p>
            <p className="font-serif text-4xl text-foreground">{item.value}</p>
            <p className="text-sm text-foreground/65">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
