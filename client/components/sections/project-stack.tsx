import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ProjectStackItem {
  title: string;
  description: string;
  image?: string;
  alt?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
}

interface ProjectStackProps {
  items: ProjectStackItem[];
}

const GAP = 88;

export function ProjectStack({ items }: ProjectStackProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <div>
        {items.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 72 }}
            animate={{
              y: idx < active ? -((active - idx) * GAP) : 0,
              opacity: idx < active ? 0.75 : 1,
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: idx < active ? -((active - idx) * GAP) : -6 }}
            onClick={() => setActive(idx)}
            style={{
              zIndex: idx === active ? 999 : items.length - idx,
              position: "relative",
              cursor: "pointer",
            }}
            className={cn(
              "relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-6 md:p-10",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.4)]",
              idx > 0 ? "-mt-16 md:-mt-24" : "mt-0"
            )}
          >
            <div className="pointer-events-none absolute inset-x-6 -top-6 hidden h-6 rounded-2xl border border-white/10 bg-white/10 md:block" />
            <div className="pointer-events-none absolute inset-x-8 -top-10 hidden h-6 rounded-2xl border border-white/10 bg-white/5 md:block" />
            <div className="pointer-events-none absolute inset-x-10 -top-14 hidden h-6 rounded-2xl border border-white/10 bg-white/5 opacity-60 md:block" />

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                {item.badge ? (
                  <p className="mb-3 text-xs uppercase tracking-[0.4em] text-foreground/60">
                    {item.badge}
                  </p>
                ) : null}
                <h3 className="font-serif text-2xl text-foreground md:text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
                {item.features && item.features.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-sm text-foreground/60">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  {item.liveUrl ? (
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={item.liveUrl} target="_blank" rel="noreferrer">
                        Visit Live Site
                      </a>
                    </Button>
                  ) : null}
                  {item.githubUrl ? (
                    <Button
                      variant="outline"
                      asChild
                      className="border-white/20 text-foreground hover:bg-white/10"
                    >
                      <a href={item.githubUrl} target="_blank" rel="noreferrer">
                        Visit GitHub
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-card to-card/80">
                  <div className="aspect-[16/10] w-full">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.alt ?? item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-foreground/40">
                        No preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
          </motion.article>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          className="border-white/20 text-foreground hover:bg-white/10"
          onClick={() => setActive((prev) => Math.max(0, prev - 1))}
        >
          Previous
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setActive((prev) => Math.min(items.length - 1, prev + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
