import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

if (!process.env.CLOUDINARY_URL && (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET)) {
    console.warn("Missing Cloudinary credentials in environment variables");
}

// If CLOUDINARY_URL is present, it will automatically be used by the SDK
// Otherwise, we configure it manually
if (!process.env.CLOUDINARY_URL) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "portfolio-uploads",
        resource_type: "auto",
    } as any,
});

export { cloudinary };
