import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Download, Send } from "lucide-react";
import { heroContent, stats } from "@/data/portfolio";

interface Resume {
  id: string;
  fileName: string;
  path: string;
  size: number;
  uploadedAt: string;
}

interface ProfilePhoto {
  exists: boolean;
  path?: string;
  fileName?: string;
}

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<ProfilePhoto>({ exists: false });
  const phrases = useMemo(() => heroContent.typingPhrases, []);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("/api/resumes");
        if (response.ok) {
          const data = await response.json();
          setResumes(data.resumes || []);
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      }
    };

    const fetchProfilePhoto = async () => {
      try {
        const response = await fetch("/api/profile-photo");
        if (response.ok) {
          const data = await response.json();
          setProfilePhoto(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    };

    fetchResumes();
    fetchProfilePhoto();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [phrases.length]);

  return (
    <section
      id="home"
      className="relative flex flex-col gap-8 pb-16 pt-4 lg:flex-row lg:items-center"
    >
      <div className="relative flex-1">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/70">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-primary/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {heroContent.availability}
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.45em] text-primary/80">
          {phrases[phraseIndex]}
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
          {heroContent.headline}
        </h1>
        <h2 className="mt-4 text-base font-semibold uppercase tracking-[0.35em] text-foreground/60 sm:text-lg">
          {heroContent.subheadline}
        </h2>
        <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
          {heroContent.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View projects
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          {resumes.length > 0 && (
            <a
              href={resumes[0].path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/80 transition hover:border-primary/60 hover:text-foreground"
            >
              Download resume
              <Download className="h-4 w-4" />
            </a>
          )}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 transition hover:text-primary"
          >
            Let’s build something
            <Send className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="relative flex-1">
        <div className="absolute -left-16 top-10 hidden h-64 w-64 animate-pulse rounded-full bg-primary/20 blur-3xl lg:block" />
        <div className="absolute -right-10 bottom-10 hidden h-72 w-72 animate-pulse rounded-full bg-secondary/25 blur-3xl lg:block" />
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-[3.25rem] bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.25),transparent_60%)] opacity-70 blur-3xl" />
          <div className="absolute inset-0 rounded-[3.25rem] bg-[radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.3),transparent_65%)] opacity-70 blur-3xl" />
          <div className="absolute inset-3 rounded-[3rem] border border-white/5 bg-gradient-to-br from-[rgba(8,16,40,0.8)] via-[rgba(10,20,45,0.9)] to-[rgba(12,24,55,0.85)] shadow-[0_25px_70px_rgba(5,15,35,0.6)]" />
          <figure className="relative flex h-full w-full items-center justify-center -translate-y-6 lg:-translate-y-10">
            <div className="absolute inset-6 rounded-[2.6rem] border border-white/15 bg-[rgba(12,18,40,0.85)] backdrop-blur">
              <div className="absolute inset-4 rounded-[2.3rem] border border-white/10 bg-black/80" />
              <div className="absolute inset-[22px] rounded-[2rem] border border-primary/60" />
              <img
                src={profilePhoto.exists ? profilePhoto.path : "https://shahe-aalam-ansari.netlify.app/images/shaheimg1.png"}
                alt="Shahe Aalam portrait"
                className="relative z-10 h-full w-full rounded-[1.9rem] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
