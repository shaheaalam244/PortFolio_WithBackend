import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import adminRouter from "./routes/admin";

export function createServer() {
  const app = express();

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

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Serve static files
  app.use(express.static("public"));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Public routes
  app.get("/api/resumes", async (_req, res) => {
    try {
      const { getResumes } = await import("./data-store");
      const resumes = getResumes();
      res.json({ resumes });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  app.get("/api/profile-photo", async (_req, res) => {
    try {
      const { getProfilePhotoPath } = await import("./data-store");
      const fs = await import("fs");
      const path = await import("path");

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

  app.get("/api/experiences", async (_req, res) => {
    try {
      const { getExperiences } = await import("./data-store");
      const experiences = getExperiences();
      res.json({ experiences });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  app.get("/api/education", async (_req, res) => {
    try {
      const { getEducation } = await import("./data-store");
      const education = getEducation();
      res.json({ education });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  app.get("/api/skills", async (_req, res) => {
    try {
      const { getSkills } = await import("./data-store");
      const skills = getSkills();
      res.json({ skills });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.get("/api/stats", async (_req, res) => {
    try {
      const { getStats } = await import("./data-store");
      const stats = getStats();
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Admin routes
  app.use("/api/admin", adminRouter);

  return app;
}
