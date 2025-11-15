import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  Globe2,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

export interface HeroContent {
  availability: string;
  headline: string;
  subheadline: string;
  description: string;
  resumeUrl: string;
  typingPhrases: string[];
}

export interface IdentityDetail {
  label: string;
  value: string;
}

export interface AboutHighlight {
  title: string;
  description: string;
}

export interface SkillMeter {
  name: string;
  progress?: number;
  founderOf?: string;
}

export interface ExperienceItem {
  title: string;
  organisation: string;
  period: string;
  status?: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  detail: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  repoUrl?: string;
  badge: string;
  highlights: string[];
  tags: string[];
  company: string;
  year: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ContactChannel {
  title: string;
  icon: LucideIcon;
  description: string;
  value: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const heroContent: HeroContent = {
  availability: "Available for new projects",
  headline: "Hello! I'm Shahe Aalam",
  subheadline: "A pursuing B.Tech CSE (AI & ML) student",
  description:
    "I craft full-stack web experiences that blend clean engineering with thoughtful design. From intuitive UIs to reliable backends, I love translating ideas into scalable products.",
  resumeUrl: "#",
  typingPhrases: ["Full-Stack Developer", "Tech Explorer", "Problem Solver"],
};

export const identityDetails: IdentityDetail[] = [
  { label: "Name", value: "Shahe Aalam" },
  { label: "Study", value: "Pursuing B.Tech CSE (AI & ML)" },
  { label: "Year", value: "2nd Year · 3rd Semester" },
  { label: "Address", value: "Lucknow, India" },
  { label: "Internship", value: "CODTECH IT Solutions" },
  { label: "Education", value: "Bachelor of Technology" },
  { label: "Languages", value: "English, Hindi" },
  { label: "Other Skills", value: "Cloud, PowerPoint, Excel, Git, JavaScript" },
  { label: "Interests", value: "Traveling, Travel Photography, Exploring new things" },
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Curious technologist",
    description:
      "Recent Computer Science professional specialising in AI & ML, continuously building projects that put users first.",
  },
  {
    title: "Product-focused",
    description:
      "From ecommerce to analytics, I enjoy delivering measurable outcomes through purposeful interfaces and smooth flows.",
  },
  {
    title: "Community oriented",
    description:
      "Mentoring peers, sharing learnings, and staying close to tech communities keeps my craft evolving.",
  },
];

export const skillMeters: SkillMeter[] = [
  { name: "DSA", founderOf: "Data Structures & Algorithms" },
  { name: "Python", founderOf: "Python Development" },
  { name: "Frontend Web Design", founderOf: "Web Design & UI" },
  { name: "C++", founderOf: "Systems Programming" },
  { name: "Java", founderOf: "Java Development" },
];

export const experiences: ExperienceItem[] = [
  {
    title: "Full Stack Web Development",
    organisation: "Independent + Internship",
    period: "2024 — Present",
    status: "Pursuing",
    description:
      "Developing responsive full-stack applications with modern JavaScript tooling, delivering end-to-end product experiences.",
    skills: [
      "HTML",
      "CSS",
      "Tailwind",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Git",
      "REST APIs",
      "Responsive Design",
    ],
  },
  {
    title: "Diploma in Computer Applications",
    organisation: "National Institute for Technical Education",
    period: "2023 — 2024",
    description:
      "Strengthened foundations across Python, Java, and C while experimenting with automation and supportive tooling.",
    skills: ["Python", "Java", "C Language"],
  },
];

export const education: EducationItem[] = [
  {
    period: "2023 — 2027",
    title: "Bachelor of Technology (CSE AI & ML)",
    institution: "Bansal Institute of Engineering & Technology, Lucknow",
    detail: "Current SGPA: 7.6 · Building expertise across AI, machine learning, and product development.",
  },
  {
    period: "2021 — 2019",
    title: "Intermediate",
    institution: "Sumitra Devi Inter College, Paikauli (Deoria)",
    detail: "Graduated with first class distinction, focusing on science and mathematics.",
  },
  {
    period: "2019 — 2017",
    title: "Higher Secondary",
    institution: "B.D. Vidya Mandir Intermediates, Hate Khas (Deoria)",
    detail: "Completed with first class distinction and leadership in co-curricular activities.",
  },
];


export const stats: StatItem[] = [
  {
    value: "05+",
    label: "Achievements",
    description: "Recognised milestones across academic and freelance journeys.",
  },
  {
    value: "12+",
    label: "Projects",
    description: "Delivered across ecommerce, hospitality, analytics, and gaming.",
  },
  {
    value: "70+",
    label: "Mentored Students",
    description: "Guided peers through coding, design thinking, and project planning.",
  },
  {
    value: "15",
    label: "Cups of Coffee",
    description: "Fueled creative problem solving during late-night sprints.",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    title: "Email",
    icon: Mail,
    description: "Let’s collaborate on your next project.",
    value: "shaheaalam041@gmail.com",
    href: "mailto:shaheaalam041@gmail.com",
  },
  {
    title: "Phone",
    icon: Phone,
    description: "Call or text to discuss opportunities.",
    value: "+91 63896 96103",
    href: "tel:+916389696103",
  },
  {
    title: "Location",
    icon: MapPin,
    description: "Based in Lucknow, collaborating globally.",
    value: "Lucknow, India",
    href: "https://maps.app.goo.gl/kx6d3059kGc1sjqS7",
  },
  {
    title: "Have a question?",
    icon: Sparkles,
    description: "Share project details and ideas directly via form.",
    value: "Open form",
    href: "https://forms.gle/RwsSNU9Uoq1JqY9JA",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCyjFSEXGdv6J-UD_otSoYsg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shahe-aalam-ansari-318245292/" },
  { label: "GitHub", href: "https://github.com/shahe-aalam" },
  { label: "X (Twitter)", href: "https://x.com/shaheaalam244a" },
  { label: "Facebook", href: "https://www.facebook.com/shaheaalam.ansari.56" },
  { label: "Instagram", href: "https://www.instagram.com/shaheaalam244/" },
  { label: "Netlify", href: "https://app.netlify.com/teams/shaheaalam244/sites" },
];
