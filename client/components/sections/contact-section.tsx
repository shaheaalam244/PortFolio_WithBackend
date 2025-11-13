import { contactChannels } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section id="contact" className="relative flex flex-col gap-16 py-24">
      <SectionHeading
        eyebrow="Collaborate"
        title="Ready for lift-off? Let’s align on your vision."
        description="Share your goals, timelines, and dream outcomes. I’ll design a roadmap that balances experimentation with dependable delivery."
      />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-primary/30 via-secondary/25 to-primary/35 p-10 text-foreground shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_65%)]" />
          <div className="relative flex h-full flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-background/70">Let’s create</p>
            <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
              “Every project begins with a shared curiosity and becomes a story we’re proud to tell.”
            </h3>
            <p className="max-w-xl text-sm text-background/80">
              Tell me about your users, the change you want to drive, and the success metrics that keep you up at night.
              I’ll bring clarity, energy, and momentum.
            </p>
            <a
              href="mailto:shaheaalam041@gmail.com"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-background px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-foreground transition hover:scale-[1.02]"
            >
              Start a conversation
            </a>
          </div>
        </div>
        <div className="grid gap-6">
          {contactChannels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex items-start gap-4 overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-6 text-left shadow-inner-glow transition hover:border-primary/60"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_65%)] opacity-0 transition group-hover:opacity-100" />
              <div className="relative mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                <channel.icon className="h-5 w-5" />
              </div>
              <div className="relative flex flex-1 flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
                  {channel.title}
                </p>
                <p className="text-lg font-semibold text-foreground">{channel.value}</p>
                <p className="text-sm text-foreground/60">{channel.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
