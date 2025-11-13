import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const SKILLS_FILE = path.join(DATA_DIR, "skills.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const STATS_FILE = path.join(DATA_DIR, "stats.json");
const HERO_CONFIG_FILE = path.join(DATA_DIR, "hero-config.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize default files if they don't exist
if (!fs.existsSync(SKILLS_FILE)) {
  fs.writeFileSync(SKILLS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
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

export function removeProject(projectId: string) {
  let projects = getProjects();
  projects = projects.filter((p: any) => p.id !== projectId);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}

export function getResumePath() {
  return path.join(UPLOADS_DIR, "resume");
}

export function deleteResume() {
  const resumeDir = getResumePath();
  if (fs.existsSync(resumeDir)) {
    fs.rmSync(resumeDir, { recursive: true, force: true });
  }
}

export function getProfilePhotoPath() {
  return path.join(UPLOADS_DIR, "profile");
}

export function deleteProfilePhoto() {
  const photoPath = getProfilePhotoPath();
  if (fs.existsSync(photoPath)) {
    fs.rmSync(photoPath, { recursive: true, force: true });
  }
}

export function getProjectImagesDir() {
  return path.join(UPLOADS_DIR, "projects");
}

export function saveProjectImage(fileName: string, buffer: Buffer): string {
  const projectDir = getProjectImagesDir();
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const timestamp = Date.now();
  const ext = path.extname(fileName) || ".jpg";
  const uniqueFileName = `project-${timestamp}${ext}`;
  const filePath = path.join(projectDir, uniqueFileName);

  fs.writeFileSync(filePath, buffer);
  return `/uploads/projects/${uniqueFileName}`;
}

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

export function updateHeroConfig(founderOf: string) {
  const config = { founderOf };
  fs.writeFileSync(HERO_CONFIG_FILE, JSON.stringify(config, null, 2));
  return config;
}
