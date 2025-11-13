import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          404
        </span>
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">This page floated away.</h1>
        <p className="max-w-xl text-sm text-foreground/65">
          The route <span className="text-foreground/90">{location.pathname}</span> doesn’t exist. Let’s reunite you with the main experience.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground transition hover:scale-[1.02]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </a>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
