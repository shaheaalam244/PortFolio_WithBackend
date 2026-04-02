import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const SKILLS_FILE = path.join(DATA_DIR, "skills.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const STATS_FILE = path.join(DATA_DIR, "stats.json");
const HERO_CONFIG_FILE = path.join(DATA_DIR, "hero-config.json");
const EXPERIENCES_FILE = path.join(DATA_DIR, "experiences.json");
const EDUCATION_FILE = path.join(DATA_DIR, "education.json");
const RESUMES_FILE = path.join(DATA_DIR, "resumes.json");
const PROFILE_PHOTO_FILE = path.join(DATA_DIR, "profile-photo.json");

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize default files if they don't exist
if (!fs.existsSync(SKILLS_FILE)) {
  fs.writeFileSync(SKILLS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(PROJECTS_FILE)) {
  const defaultProjects = [
    // ... (Placeholder for manually added projects if needed, but for now initializing empty is safer to avoid duplicates if file already exists)
    // improved logic: The file check prevents overwriting. I will put one sample project.
  ];
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(RESUMES_FILE)) {
  fs.writeFileSync(RESUMES_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(PROFILE_PHOTO_FILE)) {
  fs.writeFileSync(PROFILE_PHOTO_FILE, JSON.stringify({ url: null }, null, 2));
}

if (!fs.existsSync(STATS_FILE)) {
  const defaultStats = [
    {
      id: "achievements",
      value: "05+",
      label: "Achievements",
      description: "Recognised milestones across academic and freelance journeys.",
    },
    {
      id: "projects",
      value: "12+",
      label: "Projects",
      description: "Delivered across ecommerce, hospitality, analytics, and gaming.",
    },
    {
      id: "mentored",
      value: "70+",
      label: "Mentored Students",
      description: "Guided peers through coding, design thinking, and project planning.",
    },
    {
      id: "coffee",
      value: "15",
      label: "Cups of Coffee",
      description: "Fueled creative problem solving during late-night sprints.",
    },
  ];
  fs.writeFileSync(STATS_FILE, JSON.stringify(defaultStats, null, 2));
}

if (!fs.existsSync(HERO_CONFIG_FILE)) {
  const defaultHeroConfig = {
    founderOf: "",
  };
  fs.writeFileSync(HERO_CONFIG_FILE, JSON.stringify(defaultHeroConfig, null, 2));
}

if (!fs.existsSync(EXPERIENCES_FILE)) {
  const defaultExperiences = [
    {
      id: "full-stack-dev",
      title: "Full Stack Web Development",
      organisation: "Independent + Internship",
      period: "2024 — Present",
      status: "Pursuing",
      description: "Developing responsive full-stack applications with modern JavaScript tooling, delivering end-to-end product experiences.",
      skills: ["HTML", "CSS", "Tailwind", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "MySQL", "Git", "REST APIs", "Responsive Design"],
    },
    {
      id: "diploma-computer-apps",
      title: "Diploma in Computer Applications",
      organisation: "National Institute for Technical Education",
      period: "2023 — 2024",
      description: "Strengthened foundations across Python, Java, and C while experimenting with automation and supportive tooling.",
      skills: ["Python", "Java", "C Language"],
    },
  ];
  fs.writeFileSync(EXPERIENCES_FILE, JSON.stringify(defaultExperiences, null, 2));
}

if (!fs.existsSync(EDUCATION_FILE)) {
  const defaultEducation = [
    {
      id: "btech-cse-ai-ml",
      period: "2023 — 2027",
      title: "Bachelor of Technology (CSE AI & ML)",
      institution: "Bansal Institute of Engineering & Technology, Lucknow",
      detail: "Current SGPA: 7.6 · Building expertise across AI, machine learning, and product development.",
    },
    {
      id: "intermediate",
      period: "2021 — 2019",
      title: "Intermediate",
      institution: "Sumitra Devi Inter College, Paikauli (Deoria)",
      detail: "Graduated with first class distinction, focusing on science and mathematics.",
    },
    {
      id: "higher-secondary",
      period: "2019 — 2017",
      title: "Higher Secondary",
      institution: "B.D. Vidya Mandir Intermediates, Hate Khas (Deoria)",
      detail: "Completed with first class distinction and leadership in co-curricular activities.",
    },
  ];
  fs.writeFileSync(EDUCATION_FILE, JSON.stringify(defaultEducation, null, 2));
}

export function getSkills() {
  const data = fs.readFileSync(SKILLS_FILE, "utf-8");
  return JSON.parse(data);
}

export function addSkill(skill: any) {
  const skills = getSkills();
  const newSkill = {
    id: Date.now().toString(),
    ...skill,
  };
  skills.push(newSkill);
  fs.writeFileSync(SKILLS_FILE, JSON.stringify(skills, null, 2));
  return newSkill;
}

export function removeSkill(skillId: string) {
  let skills = getSkills();
  skills = skills.filter((s: any) => s.id !== skillId);
  fs.writeFileSync(SKILLS_FILE, JSON.stringify(skills, null, 2));
}

export function getProjects() {
  const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
  return JSON.parse(data);
}

export function addProject(project: any) {
  const projects = getProjects();
  const newProject = {
    id: Date.now().toString(),
    ...project,
  };
  projects.push(newProject);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  return newProject;
}

export function updateProject(projectId: string, project: any) {
  let projects = getProjects();
  const index = projects.findIndex((p: any) => p.id === projectId);
  if (index !== -1) {
    projects[index] = { id: projectId, ...project };
  }
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  return projects[index];
}

export function saveAllProjects(projects: any[]) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

export function removeProject(projectId: string) {
  let projects = getProjects();
  projects = projects.filter((p: any) => p.id !== projectId);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

// Resume functions
export function getResumes() {
  const data = fs.readFileSync(RESUMES_FILE, "utf-8");
  return JSON.parse(data);
}

export function addResumeRecord(fileName: string, url: string, size: number) {
  const resumes = getResumes();
  const newResume = {
    id: Date.now().toString(),
    fileName,
    path: url,
    size,
    uploadedAt: new Date().toISOString(),
  };
  resumes.push(newResume);
  fs.writeFileSync(RESUMES_FILE, JSON.stringify(resumes, null, 2));
  return newResume;
}

export function deleteResumeRecord(resumeId: string) {
  let resumes = getResumes();
  resumes = resumes.filter((r: any) => r.id !== resumeId && r.fileName !== resumeId);
  fs.writeFileSync(RESUMES_FILE, JSON.stringify(resumes, null, 2));
}

// Profile Photo functions
export function getProfilePhoto() {
  const data = fs.readFileSync(PROFILE_PHOTO_FILE, "utf-8");
  return JSON.parse(data);
}

export function updateProfilePhoto(url: string) {
  const data = { url: url, updatedAt: new Date().toISOString() };
  fs.writeFileSync(PROFILE_PHOTO_FILE, JSON.stringify(data, null, 2));
  return data;
}

export function deleteProfilePhoto() {
  fs.writeFileSync(PROFILE_PHOTO_FILE, JSON.stringify({ url: null }, null, 2));
}

// Stats functions
export function getStats() {
  const data = fs.readFileSync(STATS_FILE, "utf-8");
  return JSON.parse(data);
}

export function updateStat(statId: string, value: string, label: string, description: string) {
  let stats = getStats();
  const index = stats.findIndex((s: any) => s.id === statId);
  if (index !== -1) {
    stats[index] = { id: statId, value, label, description };
  }
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  return stats[index];
}

export function getHeroConfig() {
  const data = fs.readFileSync(HERO_CONFIG_FILE, "utf-8");
  return JSON.parse(data);
}

export function updateHeroConfig(founderOf: string, tagline?: string, founderUrl?: string) {
  const config = {
    founderOf,
    tagline: tagline || "",
    founderUrl: founderUrl || ""
  };
  fs.writeFileSync(HERO_CONFIG_FILE, JSON.stringify(config, null, 2));
  return config;
}

export function getExperiences() {
  const data = fs.readFileSync(EXPERIENCES_FILE, "utf-8");
  return JSON.parse(data);
}

export function addExperience(experience: any) {
  const experiences = getExperiences();
  const newExperience = {
    id: Date.now().toString(),
    ...experience,
  };
  experiences.push(newExperience);
  fs.writeFileSync(EXPERIENCES_FILE, JSON.stringify(experiences, null, 2));
  return newExperience;
}

export function updateExperience(experienceId: string, experience: any) {
  let experiences = getExperiences();
  const index = experiences.findIndex((e: any) => e.id === experienceId);
  if (index !== -1) {
    experiences[index] = { id: experienceId, ...experience };
  }
  fs.writeFileSync(EXPERIENCES_FILE, JSON.stringify(experiences, null, 2));
  return experiences[index];
}

export function removeExperience(experienceId: string) {
  let experiences = getExperiences();
  experiences = experiences.filter((e: any) => e.id !== experienceId);
  fs.writeFileSync(EXPERIENCES_FILE, JSON.stringify(experiences, null, 2));
}

export function getEducation() {
  const data = fs.readFileSync(EDUCATION_FILE, "utf-8");
  return JSON.parse(data);
}

export function addEducation(education: any) {
  const educations = getEducation();
  const newEducation = {
    id: Date.now().toString(),
    ...education,
  };
  educations.push(newEducation);
  fs.writeFileSync(EDUCATION_FILE, JSON.stringify(educations, null, 2));
  return newEducation;
}

export function updateEducation(educationId: string, education: any) {
  let educations = getEducation();
  const index = educations.findIndex((e: any) => e.id === educationId);
  if (index !== -1) {
    educations[index] = { id: educationId, ...education };
  }
  fs.writeFileSync(EDUCATION_FILE, JSON.stringify(educations, null, 2));
  return educations[index];
}

export function removeEducation(educationId: string) {
  let educations = getEducation();
  educations = educations.filter((e: any) => e.id !== educationId);
  fs.writeFileSync(EDUCATION_FILE, JSON.stringify(educations, null, 2));
}
