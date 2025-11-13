import { aboutHighlights, identityDetails } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

export function ExpertiseSection() {
  return (
    <section id="about" className="relative flex flex-col gap-16 py-24">
      <SectionHeading
        eyebrow="About"
        title="A technologist blending academic rigor with real-world shipping."
        description="I’m a Computer Science (AI & ML) student who loves crafting experiences that feel human, performant, and purposeful. Here’s the story behind the pixels."
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-8 shadow-inner-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_65%)]" />
          <div className="relative space-y-6 text-sm text-foreground/70">
            {aboutHighlights.map((highlight) => (
              <div key={highlight.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary/80">
                  {highlight.title}
                </p>
                <p className="mt-2 leading-relaxed text-foreground/70">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-8 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
            <span className="rounded-full border border-white/10 px-4 py-2">Lifelong Learner</span>
            <span className="rounded-full border border-white/10 px-4 py-2">Community Mentor</span>
            <span className="rounded-full border border-white/10 px-4 py-2">Creative Coder</span>
          </div>
        </article>
        <article className="relative grid gap-4 rounded-3xl border border-white/10 bg-card/50 p-8 shadow-inner-glow md:grid-cols-2">
          {identityDetails.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-foreground/50">
                {detail.label}
              </span>
              <span className="text-sm text-foreground/80">{detail.value}</span>
            </div>
          ))}
        </article>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/50 p-10 shadow-inner-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.12),transparent_70%)]" />
        <div className="relative flex flex-col gap-5">
          <h3 className="font-serif text-2xl text-foreground">Let’s connect</h3>
          <p className="max-w-2xl text-sm text-foreground/65">
            I’m currently open to internships, freelance collaborations, and product experiments that push what’s possible
            with the modern web. Share your vision and we’ll chart a path together.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70">
            <a
              href="https://www.linkedin.com/in/shahe-aalam-ansari-318245292/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
            >
              LinkedIn Profile
            </a>
            <a
              href="https://www.youtube.com/channel/UCyjFSEXGdv6J-UD_otSoYsg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
            >
              YouTube Channel
            </a>
            <a
              href="https://forms.gle/RwsSNU9Uoq1JqY9JA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
            >
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
