import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects as defaultProjects } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

const stackLayers = Array.from({ length: 4 });

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/admin/projects");
        if (response.ok) {
          const data = await response.json();
          const adminProjects = data.projects || [];
          // Merge admin projects with default projects
          const allProjects = [...defaultProjects, ...adminProjects];
          setProjects(allProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        // Keep using default projects on error
      }
    };

    fetchProjects();
  }, []);

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex, projects]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="relative flex flex-col gap-16 py-24">
      <SectionHeading
        eyebrow={`Projects • ${projects.length}+ Delivered`}
        title="Recent builds translating ideas into polished digital products."
        description="See how I transform briefs into immersive, metrics-driven experiences across SaaS, ecommerce, and storytelling domains."
        align="center"
      />
      <div className="relative flex justify-center pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-6 -z-10 flex flex-col items-center gap-6">
          {stackLayers.map((_, index) => (
            <div
              key={`layer-${index}`}
              className="h-full w-full max-w-6xl rounded-[32px] border border-white/10 bg-card/40"
              style={{
                transform: `translateY(-${(index + 1) * 26}px)` ,
                opacity: 0.16 - index * 0.025,
              }}
            />
          ))}
        </div>
        <article className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-br from-[hsl(222,63%,12%)] via-[hsl(223,52%,10%)] to-[hsl(223,44%,16%)] p-8 text-foreground shadow-[0_30px_90px_rgba(2,12,34,0.55)] sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_65%)] opacity-60" />
          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-primary">
                <span>{activeProject.company}</span>
                <span className="text-foreground/40">•</span>
                <span>{activeProject.year}</span>
              </div>
              <h3 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {activeProject.title}
              </h3>
              <p className="mt-4 max-w-xl text-base text-foreground/65 sm:text-lg">
                {activeProject.description}
              </p>
              <hr className="mt-6 border-white/10" />
              <ul className="mt-6 flex flex-col gap-4 text-base text-foreground/70">
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-[2px] h-4 w-4 text-secondary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4 text-sm sm:text-base">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">
                    Visit Live Site
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {activeProject.repoUrl ? (
                  <Button
                    variant="outline"
                    asChild
                    className="border-white/20 px-6 py-3 text-base font-semibold text-foreground hover:bg-white/10"
                  >
                    <a href={activeProject.repoUrl} target="_blank" rel="noreferrer">
                      Visit GitHub
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-16 top-6 hidden h-56 w-56 rounded-full bg-primary/20 blur-3xl lg:block" />
              <div className="absolute -right-12 bottom-0 hidden h-52 w-52 rounded-full bg-secondary/25 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-card/70 shadow-[0_20px_80px_rgba(15,35,80,0.45)]">
                <div className="flex items-center justify-between bg-primary px-7 py-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground sm:text-base">
                  <span>{activeProject.title}</span>
                  <span>{activeProject.year}</span>
                </div>
                <div className="aspect-[16/10] w-full">
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold sm:text-sm">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] transition sm:text-sm",
                    index === activeIndex
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/10 text-foreground/50 hover:text-foreground"
                  )}
                >
                  {project.title}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-white/20 px-6 py-3 text-base font-semibold text-foreground hover:bg-white/10"
                onClick={goToPrevious}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                className="bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={goToNext}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
