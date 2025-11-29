import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const SKILLS_FILE = path.join(DATA_DIR, "skills.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const STATS_FILE = path.join(DATA_DIR, "stats.json");
const HERO_CONFIG_FILE = path.join(DATA_DIR, "hero-config.json");
const EXPERIENCES_FILE = path.join(DATA_DIR, "experiences.json");
const EDUCATION_FILE = path.join(DATA_DIR, "education.json");
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

export function getResumes() {
  const resumeDir = getResumePath();
  if (!fs.existsSync(resumeDir)) {
    return [];
  }
  const files = fs.readdirSync(resumeDir);
  return files.map(file => {
    const filePath = path.join(resumeDir, file);
    const stats = fs.statSync(filePath);
    return {
      id: file,
      fileName: file,
      path: `/uploads/resume/${file}`,
      size: stats.size,
      uploadedAt: stats.mtime.toISOString(),
    };
  });
}

export function saveResume(fileName: string, buffer: Buffer) {
  const resumeDir = getResumePath();
  if (!fs.existsSync(resumeDir)) {
    fs.mkdirSync(resumeDir, { recursive: true });
  }
  const timestamp = Date.now();
  const ext = path.extname(fileName) || ".pdf";
  const uniqueFileName = `resume-${timestamp}${ext}`;
  const filePath = path.join(resumeDir, uniqueFileName);
  fs.writeFileSync(filePath, buffer);
  return uniqueFileName;
}

export function deleteResume(fileName: string) {
  const resumeDir = getResumePath();
  const filePath = path.join(resumeDir, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function getProfilePhotoPath() {
  return path.join(UPLOADS_DIR, "profile");
}

export function deleteProfilePhoto() {
  const photoPath = getProfilePhotoPath();
  if (fs.existsSync(photoPath)) {
    const files = fs.readdirSync(photoPath);
    for (const file of files) {
      fs.unlinkSync(path.join(photoPath, file));
    }
    fs.rmdirSync(photoPath);
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

export function saveProfilePhoto(file: Express.Multer.File): string {
  const profileDir = getProfilePhotoPath();
  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }

  // Remove any existing profile photos
  const existingFiles = fs.readdirSync(profileDir);
  existingFiles.forEach(fileName => {
    fs.unlinkSync(path.join(profileDir, fileName));
  });

  // Save the new profile photo with a fixed name
  const fileName = 'profile.jpg';
  const filePath = path.join(profileDir, fileName);
  if (file.path) {
    // If file is saved to disk by multer
    fs.renameSync(file.path, filePath);
  } else if (file.buffer) {
    // If file is in memory
    fs.writeFileSync(filePath, file.buffer);
  } else {
    throw new Error('No file data');
  }

  return `/uploads/profile/${fileName}`;
}
