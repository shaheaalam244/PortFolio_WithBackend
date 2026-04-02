import { Router, Request, Response } from "express";
import multer from "multer";
import { storage, cloudinary } from "../cloudinary";
import {
  getSkills,
  addSkill,
  removeSkill,
  getProjects,
  addProject,
  updateProject,
  removeProject,
  getResumes,
  addResumeRecord,
  deleteResumeRecord,
  getProfilePhoto,
  updateProfilePhoto,
  deleteProfilePhoto,
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

// Configure multer with Cloudinary storage and file validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allowed mime types
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, PDF, DOC, and DOCX are allowed.'));
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

// Reorder endpoint
router.put("/projects/reorder", (req: Request, res: Response) => {
  try {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: "Invalid projects data" });
    }

    // Import saveAllProjects dynamically to avoid circular dependency issues if any,
    // though here we are in same context.
    // Actually we need to export it from data-store first.
    // We already added it.
    const { saveAllProjects } = require("../data-store");
    saveAllProjects(projects);
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder projects" });
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
    const url = req.file.path;
    const size = req.file.size;

    const savedResume = addResumeRecord(fileName, url, size);

    console.log(`Resume saved successfully: ${fileName}, URL: ${url}`);
    res.json({ success: true, path: url });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Failed to upload resume: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

router.delete("/resume/:resumeId", (req: Request, res: Response) => {
  try {
    const { resumeId } = req.params;
    deleteResumeRecord(resumeId);
    console.log(`Resume record ${resumeId} deleted`);
    // Note: This does not delete from Cloudinary automatically
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Failed to delete resume: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

// Project image endpoint (Base64 upload support)
router.post("/project-image", async (req: Request, res: Response) => {
  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    // Upload base64 to Cloudinary
    const result = await cloudinary.uploader.upload(fileData, {
      folder: "portfolio-uploads/projects",
      resource_type: "image",
      public_id: fileName ? fileName.split('.')[0] : undefined, // Optional: use filename as public_id
    });

    res.json({ success: true, path: result.secure_url });
  } catch (error) {
    console.error("Project image upload error:", error);
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
    const photoData = getProfilePhoto();
    if (photoData.url) {
      res.json({
        exists: true,
        path: photoData.url,
        fileName: "profile",
      });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.json({ exists: false });
  }
});

// Profile photo upload (Multer with Cloudinary)
router.post("/profile-photo-upload", upload.single('profile'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const url = req.file.path;
    updateProfilePhoto(url);

    console.log(`Profile photo saved successfully: ${url}`);
    res.json({ success: true, path: url });
  } catch (error) {
    console.error("Profile photo upload error:", error);
    res.status(500).json({ error: "Failed to upload profile photo: " + (error instanceof Error ? error.message : "Unknown error") });
  }
});

// Legacy profile-photo endpoint (Base64) - keeping for compatibility if needed, but updated to Cloudinary
router.post("/profile-photo", async (req: Request, res: Response) => {
  try {
    const { fileData } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    const result = await cloudinary.uploader.upload(fileData, {
      folder: "portfolio-uploads/profile",
      resource_type: "image",
    });

    updateProfilePhoto(result.secure_url);
    res.json({ success: true, path: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload profile photo" });
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
    const { founderOf, tagline, founderUrl } = req.body;
    const config = updateHeroConfig(founderOf || "", tagline || "", founderUrl || "");
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
