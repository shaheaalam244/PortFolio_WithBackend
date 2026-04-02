import { useState, useEffect } from "react";
import { skillMeters } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

export function SkillsSection() {
  const [skills, setSkills] = useState(skillMeters);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data.skills || skillMeters);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        // Keep using default skills on error
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="relative flex flex-col gap-16 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="Blending analytical foundations with expressive front-end craft."
        description="From data structures to design systems, I invest in versatile skills that keep ideas moving toward launch."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <div
            key={(skill as any).name || (skill as any).id}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-4 shadow-inner-glow animate-float"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_65%)]" />
            <div className="relative flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
              <span className="inline-flex w-fit rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                {skill.founderOf || "Skill"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
