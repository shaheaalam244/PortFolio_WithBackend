# Portfolio Deployment Guide

This guide will help you deploy your full-stack portfolio to the cloud.

## 1. Prerequisites
- **GitHub Account**: Push your code to a GitHub repository.
- **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com/). Get your `Cloud Name`, `API Key`, and `API Secret`.
- **Render Account**: For Backend hosting ([render.com](https://render.com/)).
- **Vercel Account**: For Frontend hosting ([vercel.com](https://vercel.com/)).

## 2. Push Code to GitHub
Ensure all your changes (including the Cloudinary integration we just added) are committed and pushed.

```bash
git add .
git commit -m "Setup Cloudinary and prepare for deployment"
git push origin main
```

## 3. Deploy Backend (Render)
1.  **New Web Service**: In Render dashboard, click "New +", select "Web Service".
2.  **Connect Repo**: Select your portfolio repository.
3.  **Configure**:
    *   **Name**: `my-portfolio-backend` (example)
    *   **Region**: Closest to you (e.g., Singapore, Frankfurt).
    *   **Branch**: `main`
    *   **Root Directory**: `.` (leave empty).
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build:server`
    *   **Start Command**: `npm run start`
4.  **Environment Variables**: Scroll down to "Environment Variables" and add:
    *   `CLOUDINARY_CLOUD_NAME`: (Your Cloud Name)
    *   `CLOUDINARY_API_KEY`: (Your API Key)
    *   `CLOUDINARY_API_SECRET`: (Your API Secret)
    *   `PORT`: `3000` (Render creates this automatically, but good to know)
5.  **Deploy**: Click "Create Web Service".
6.  **Wait**: Wait for the build to finish. Once live, copy the **onrender.com URL** (e.g., `https://my-portfolio-backend.onrender.com`).

**⚠️ Important Note on Data Persistence**:
Since we are using JSON files for data (`server/data/*.json`), **text updates (ex: skills, descriptions) will reset** every time you redeploy or the server restarts.
*   **Images/Resumes** are safe because we moved them to Cloudinary.
*   To fix the text data persistence in the future, you should migrate to a database like **MongoDB**.

## 4. Deploy Frontend (Vercel)
1.  **New Project**: In Vercel dashboard, click "Add New...", select "Project".
2.  **Import Git Repository**: Select your portfolio repository.
3.  **Configure Project**:
    *   **Framework Preset**: `Vite` (should be auto-detected).
    *   **Root Directory**: `.`
    *   **Build Command**: `npm run build:client` (Override if it defaults to just `vite build`)
    *   **Output Directory**: `dist/spa` (Override if it defaults to `dist`)
4.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your Render Backend URL (e.g., `https://my-portfolio-backend.onrender.com`). **Do not add a trailing slash**.
5.  **Deploy**: Click "Deploy".

## 5. Final Verification
1.  Open your Vercel URL.
2.  Check the `Projects` section. It should load data from the backend.
3.  Go to `/admin` (or your admin route), log in, and try uploading a Resume or Profile Picture.
    *   It should upload to Cloudinary.
    *   The link should persist.

## Troubleshooting
*   **CORS Error**: If the frontend says "Network Error" or CORS issues, ensure your Backend allows the Vercel domain. Currently, `cors()` in `server/index.ts` allows all origins, which is fine for now but can be restricted later.
*   **Backend 404**: If you visit the Backend URL directly, you might see "Cannot GET /". This is normal if you don't have a root route. Try `/api/admin/projects` to verify it's running.
