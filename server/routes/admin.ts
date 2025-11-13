import { Router, Request, Response } from "express";
import { Router, Request, Response } from "express";
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
  deleteResume,
  getProfilePhotoPath,
  deleteProfilePhoto,
  saveProjectImage,
  getStats,
  updateStat,
  getHeroConfig,
  updateHeroConfig,
} from "../data-store";

const router = Router();

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

router.delete("/projects/:projectId", (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    removeProject(projectId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Profile photo endpoints
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
router.get("/resume", (_req: Request, res: Response) => {
  try {
    const resumeDir = getResumePath();
    if (!fs.existsSync(resumeDir)) {
      return res.json({ exists: false });
    }

    const files = fs.readdirSync(resumeDir);
    if (files.length === 0) {
      return res.json({ exists: false });
    }

    const resumeFile = files[0];
    const filePath = path.join(resumeDir, resumeFile);
    const stats = fs.statSync(filePath);

    res.json({
      exists: true,
      fileName: resumeFile,
      path: `/uploads/resume/${resumeFile}`,
      size: stats.size,
    });
  } catch (error) {
    res.json({ exists: false });
  }
});

router.post("/resume", (req: Request, res: Response) => {
  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    if (!fileName) {
      return res.status(400).json({ error: "No file name provided" });
    }

    // Delete old resume
    try {
      deleteResume();
    } catch (e) {
      console.error("Error deleting old resume:", e);
    }

    const resumeDir = getResumePath();
    if (!fs.existsSync(resumeDir)) {
      fs.mkdirSync(resumeDir, { recursive: true });
    }

    // Decode base64 and save file
    try {
      const base64Data = fileData.split(",")[1] || fileData;
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        return res.status(400).json({ error: "File data is empty" });
      }

      const ext = path.extname(fileName) || ".pdf";
      const filePath = path.join(resumeDir, `resume${ext}`);

      fs.writeFileSync(filePath, buffer);

      console.log(`Resume saved successfully: ${filePath}, Size: ${buffer.length} bytes`);
      res.json({ success: true, path: `/uploads/resume/resume${ext}` });
    } catch (encodeError) {
      console.error("Error encoding/saving resume:", encodeError);
      return res.status(400).json({ error: "Failed to process file data" });
    }
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Failed to upload resume: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

router.delete("/resume", (_req: Request, res: Response) => {
  try {
    deleteResume();
    console.log("Resume deleted successfully");
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

export default router;
