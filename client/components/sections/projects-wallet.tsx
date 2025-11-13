import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface WalletProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  alt?: string;
}

interface ProjectsWalletProps {
  projects: WalletProjectItem[];
}

export function ProjectsWallet({ projects }: ProjectsWalletProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-card to-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
            Real-world Results
          </p>
          <h3 className="mt-2 font-serif text-xl text-foreground">Project Wallet</h3>
          <p className="text-sm text-foreground/60">Swipe through featured builds</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-8 w-8 rounded-full bg-primary/20 ring-1 ring-primary/40" />
          <div className="-ml-3 h-8 w-8 rounded-full bg-secondary/20 ring-1 ring-secondary/40" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform",
              index % 3 === 0 && "-rotate-1",
              index % 3 === 1 && "rotate-[0.6deg]",
              index % 3 === 2 && "-rotate-[0.4deg]"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_-10%,hsl(var(--primary)/0.15),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              {project.image ? (
                <div className="mb-3 overflow-hidden rounded-xl border border-white/10">
                  <div className="aspect-[16/10] w-full bg-black/30">
                    <img
                      src={project.image}
                      alt={project.alt ?? project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}
              <div className="mb-3 flex items-center gap-2">
                <div className="grid size-8 place-content-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h4 className="text-base font-semibold tracking-tight text-foreground">{project.title}</h4>
              </div>
              <p className="text-sm text-foreground/70 line-clamp-2">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                {project.link ? (
                  <Button asChild className="h-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="h-8 bg-white/10 text-foreground">
                    Coming soon
                  </Button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
