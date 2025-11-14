import { Router, Request, Response } from "express";
import multer from "multer";
import * as path from "path";
import * as fs from "fs";
import {
  getSkills,
  addSkill,
  removeSkill,
  getProjects,
  addProject,
  removeProject,
  getUploadsDir,
  getResumePath,
  getResumes,
  saveResume,
  deleteResume,
  getProfilePhotoPath,
  deleteProfilePhoto,
  saveProjectImage,
  getStats,
  updateStat,
  getHeroConfig,
  updateHeroConfig,
  getExperiences,
  addExperience,
  updateExperience,
  removeExperience,
  getEducation,
  addEducation,
  updateEducation,
  removeEducation,
} from "../data-store";

const router = Router();

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow PDF, DOC, DOCX files
    if (file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// Configure multer for profile photo uploads
const uploadProfile = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Skills endpoints
router.get("/skills", (_req: Request, res: Response) => {
  try {
    const skills = getSkills();
    res.json({ skills });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

router.post("/skills", (req: Request, res: Response) => {
  try {
    const { name, progress } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Skill name required" });
    }
    const skill = addSkill({ name, progress });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
});

router.delete("/skills/:skillId", (req: Request, res: Response) => {
  try {
    const { skillId } = req.params;
    removeSkill(skillId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove skill" });
  }
});

// Projects endpoints
router.get("/projects", (_req: Request, res: Response) => {
  try {
    const projects = getProjects();
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.post("/projects", (req: Request, res: Response) => {
  try {
    const { title, description, image, liveUrl, repoUrl, badge, highlights, tags, company, year } =
      req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }
    const project = addProject({
      title,
      description,
      image: image || "",
      liveUrl: liveUrl || "",
      repoUrl: repoUrl || "",
      badge: badge || "Custom",
      highlights: highlights || [],
      tags: tags || [],
      company: company || "Personal Project",
      year: year || new Date().getFullYear().toString(),
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

router.put("/projects/:projectId", (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { title, description, image, liveUrl, repoUrl, badge, highlights, tags, company, year } =
      req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    const { updateProject } = require("../data-store");

    const project = updateProject(projectId, {
      title,
      description,
      image: image || "",
      liveUrl: liveUrl || "",
      repoUrl: repoUrl || "",
      badge: badge || "Custom",
      highlights: highlights || [],
      tags: tags || [],
      company: company || "Personal Project",
      year: year || new Date().getFullYear().toString(),
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:projectId", (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    removeProject(projectId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Profile photo endpoints (base64 version - kept for backward compatibility)
router.post("/profile-photo", (req: Request, res: Response) => {
  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    // Delete old profile photo
    deleteProfilePhoto();

    const profileDir = getProfilePhotoPath();
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }

    // Decode base64 and save file
    const buffer = Buffer.from(fileData.split(",")[1] || fileData, "base64");
    const ext = path.extname(fileName) || ".jpg";
    const filePath = path.join(profileDir, `profile${ext}`);

    fs.writeFileSync(filePath, buffer);
    res.json({ success: true, path: `/uploads/profile/profile${ext}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload profile photo" });
  }
});

// Resume endpoints
router.get("/resumes", (_req: Request, res: Response) => {
  try {
    const resumes = getResumes();
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

router.post("/resume", upload.single('resume'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = req.file.originalname;
    const buffer = req.file.buffer;

    const savedFileName = saveResume(fileName, buffer);

    console.log(`Resume saved successfully: ${savedFileName}, Size: ${buffer.length} bytes`);
    res.json({ success: true, path: `/uploads/resume/${savedFileName}` });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Failed to upload resume: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

router.delete("/resume/:fileName", (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    deleteResume(fileName);
    console.log(`Resume ${fileName} deleted successfully`);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Failed to delete resume: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

// Project image endpoint
router.post("/project-image", (req: Request, res: Response) => {
  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    // Decode base64 and save file
    const buffer = Buffer.from(fileData.split(",")[1] || fileData, "base64");
    const imagePath = saveProjectImage(fileName, buffer);

    res.json({ success: true, path: imagePath });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload project image" });
  }
});

// Stats endpoints
router.get("/stats", (_req: Request, res: Response) => {
  try {
    const stats = getStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.put("/stats/:statId", (req: Request, res: Response) => {
  try {
    const { statId } = req.params;
    const { value, label, description } = req.body;

    if (!value || !label) {
      return res.status(400).json({ error: "Value and label required" });
    }

    const stat = updateStat(statId, value, label, description || "");
    res.json(stat);
  } catch (error) {
    res.status(500).json({ error: "Failed to update stat" });
  }
});

// Profile photo endpoints
router.get("/profile-photo", (_req: Request, res: Response) => {
  try {
    const profileDir = getProfilePhotoPath();
    if (!fs.existsSync(profileDir)) {
      return res.json({ exists: false });
    }

    const files = fs.readdirSync(profileDir);
    if (files.length === 0) {
      return res.json({ exists: false });
    }

    const photoFile = files[0];
    const filePath = path.join(profileDir, photoFile);

    res.json({
      exists: true,
      path: `/uploads/profile/${photoFile}`,
      fileName: photoFile,
    });
  } catch (error) {
    res.json({ exists: false });
  }
});

// Profile photo endpoints (multer version)
router.post("/profile-photo-upload", uploadProfile.single('profile'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = req.file.originalname;
    const buffer = req.file.buffer;

    // Delete old profile photo
    try {
      deleteProfilePhoto();
    } catch (e) {
      console.error("Error deleting old profile photo:", e);
    }

    const profileDir = getProfilePhotoPath();
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }

    const ext = path.extname(fileName) || ".jpg";
    const filePath = path.join(profileDir, `profile${ext}`);

    fs.writeFileSync(filePath, buffer);

    console.log(`Profile photo saved successfully: ${filePath}, Size: ${buffer.length} bytes`);
    res.json({ success: true, path: `/uploads/profile/profile${ext}` });
  } catch (error) {
    console.error("Profile photo upload error:", error);
    res.status(500).json({ error: "Failed to upload profile photo: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

router.delete("/profile-photo", (_req: Request, res: Response) => {
  try {
    deleteProfilePhoto();
    console.log("Profile photo deleted successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    res.status(500).json({ error: "Failed to delete profile photo: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

// Hero config endpoints
router.get("/hero-config", (_req: Request, res: Response) => {
  try {
    const config = getHeroConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hero config" });
  }
});

router.put("/hero-config", (req: Request, res: Response) => {
  try {
    const { founderOf } = req.body;
    const config = updateHeroConfig(founderOf || "");
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hero config" });
  }
});

router.get("/experiences", (_req: Request, res: Response) => {
  try {
    const experiences = getExperiences();
    res.json({ experiences });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

router.post("/experiences", (req: Request, res: Response) => {
  try {
    const { title, organisation, period, status, description, skills } = req.body;
    if (!title || !organisation || !period || !description) {
      return res.status(400).json({ error: "Title, organisation, period, and description required" });
    }
    const experience = addExperience({
      title,
      organisation,
      period,
      status: status || "",
      description,
      skills: skills || [],
    });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to add experience" });
  }
});

router.put("/experiences/:experienceId", (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;
    const { title, organisation, period, status, description, skills } = req.body;
    if (!title || !organisation || !period || !description) {
      return res.status(400).json({ error: "Title, organisation, period, and description required" });
    }
    const experience = updateExperience(experienceId, {
      title,
      organisation,
      period,
      status: status || "",
      description,
      skills: skills || [],
    });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to update experience" });
  }
});

router.delete("/experiences/:experienceId", (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;
    removeExperience(experienceId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove experience" });
  }
});

router.get("/education", (_req: Request, res: Response) => {
  try {
    const education = getEducation();
    res.json({ education });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

router.post("/education", (req: Request, res: Response) => {
  try {
    const { period, title, institution, detail } = req.body;
    if (!period || !title || !institution) {
      return res.status(400).json({ error: "Period, title, and institution required" });
    }
    const education = addEducation({
      period,
      title,
      institution,
      detail: detail || "",
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Failed to add education" });
  }
});

router.put("/education/:educationId", (req: Request, res: Response) => {
  try {
    const { educationId } = req.params;
    const { period, title, institution, detail } = req.body;
    if (!period || !title || !institution) {
      return res.status(400).json({ error: "Period, title, and institution required" });
    }
    const education = updateEducation(educationId, {
      period,
      title,
      institution,
      detail: detail || "",
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Failed to update education" });
  }
});

router.delete("/education/:educationId", (req: Request, res: Response) => {
  try {
    const { educationId } = req.params;
    removeEducation(educationId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove education" });
  }
});

export default router;
