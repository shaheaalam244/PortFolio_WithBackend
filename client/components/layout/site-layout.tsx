import type { PropsWithChildren } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[100] rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground opacity-0 focus-visible:opacity-100"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-glow" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-overlay bg-[length:160px_160px] opacity-[0.08]" />
      <SiteHeader />
      <main id="main-content" className="relative mx-auto w-full max-w-6xl px-6 pt-36 md:pt-44">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
