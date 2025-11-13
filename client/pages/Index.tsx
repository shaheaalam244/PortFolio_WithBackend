import { SiteLayout } from "@/components/layout/site-layout";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { StatsSection } from "@/components/sections/stats-section";

export default function Index() {
  return (
    <SiteLayout>
      <HeroSection />
      <ExpertiseSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <StatsSection />
      <ContactSection />
    </SiteLayout>
  );
}
