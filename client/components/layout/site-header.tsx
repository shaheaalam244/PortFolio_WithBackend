import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div
        className={cn(
          "relative w-full max-w-6xl overflow-hidden rounded-full border transition-all",
          "border-white/10 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/40",
          isScrolled && "shadow-glow"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.12),transparent_60%)]" />
        <nav className="relative flex items-center justify-between px-5 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground/70">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-full bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/80 transition hover:text-primary"
            onClick={closeMenu}
          >
            <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
            Shahe Aalam
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Let’s Talk
            </a>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground transition md:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <div
          id="mobile-nav"
          className={cn(
            "md:hidden",
            "origin-top overflow-hidden border-t border-white/10 bg-card/95 backdrop-blur transition-[max-height,opacity] duration-300",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-2 px-6 py-6 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-3 transition hover:bg-primary/10 hover:text-foreground"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
              >
                Let’s Talk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
