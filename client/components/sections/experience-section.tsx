import { education, experiences } from "@/data/portfolio";
import { useState, useEffect } from "react";
import { SectionHeading } from "./section-heading";

export function ExperienceSection() {
  const [dynamicExperiences, setDynamicExperiences] = useState<any[]>([]);
  const [dynamicEducation, setDynamicEducation] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experiences");
        if (response.ok) {
          const data = await response.json();
          setDynamicExperiences(data.experiences || []);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/education");
        if (response.ok) {
          const data = await response.json();
          setDynamicEducation(data.education || []);
        }
      } catch (error) {
        console.error("Failed to fetch education:", error);
      }
    };

    fetchExperiences();
    fetchEducation();
  }, []);

  const displayExperiences = dynamicExperiences.length > 0 ? dynamicExperiences : experiences;
  const displayEducation = dynamicEducation.length > 0 ? dynamicEducation : education;

  return (
    <section id="experience" className="relative flex flex-col gap-16 py-24">
      <SectionHeading
        eyebrow="Resume"
        title="Education and practical experience powering every build."
        description="Combining structured learning with hands-on projects keeps my work grounded, curious, and delivery-focused."
      />
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <ol className="relative space-y-10 border-l border-white/10 pl-8">
          <div className="absolute left-[-0.6rem] top-1 h-full w-0.5 bg-gradient-to-b from-primary/60 via-white/10 to-transparent" />
          {displayExperiences.map((experience) => (
            <li key={`${experience.title}-${experience.organisation}`} className="relative rounded-3xl border border-white/10 bg-card/60 p-8 shadow-inner-glow">
              <span className="absolute -left-[1.85rem] top-10 h-3 w-3 rounded-full border border-white/40 bg-primary" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/90">
                  {experience.period}
                </p>
                {experience.status ? (
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                    {experience.status}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-6 font-serif text-2xl text-foreground">{experience.title}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.25em] text-foreground/50">
                {experience.organisation}
              </p>
              <p className="mt-4 text-sm text-foreground/65">{experience.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-foreground/55">
                {experience.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 px-3 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <aside className="space-y-6 rounded-3xl border border-white/10 bg-card/50 p-8 shadow-inner-glow">
          <h3 className="font-serif text-2xl text-foreground">Education</h3>
          <p className="text-sm text-foreground/65">
            Formal programmes that sharpened my analytical thinking, collaboration, and technology leadership.
          </p>
          <div className="space-y-5">
            {displayEducation.map((item) => (
              <div
                key={`${item.title}-${item.institution}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-foreground/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">{item.period}</p>
                <p className="mt-3 font-semibold text-foreground">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">{item.institution}</p>
                <p className="mt-3 text-xs text-foreground/55">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-5 text-sm text-foreground">
            <p className="font-semibold uppercase tracking-[0.35em] text-foreground/70">Mindset</p>
            <p className="mt-2 text-sm text-foreground/80">
              I’m fuelled by curiosity, guided by mentorship, and always experimenting to turn insights into impact.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
