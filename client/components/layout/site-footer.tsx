import { socialLinks } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_70%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">
            Shahe Aalam Portfolio
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Building immersive digital journeys.
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-sm md:items-end md:text-right">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-4 py-2 transition hover:border-primary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Shahe Aalam. Crafted with intent and curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
