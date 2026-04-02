import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const cloud_name = "dlahaq91e";
const api_key = "312375174442514";

const variants = [
    "DJavdiwHB5IBrPuG9hzk-HKZxaE", // Capital I, z
    "DJavdiwHB5lBrPuG9hzk-HKZxaE", // Lowercase l, z
    "DJavdiwHB51BrPuG9hzk-HKZxaE", // Number 1, z
    "DJavdiwHB5IBrPuG9h2k-HKZxaE", // Capital I, 2
    "DJavdiwHB5lBrPuG9h2k-HKZxaE", // Lowercase l, 2
];

async function testConnection() {
    console.log("Testing Cloudinary credentials variants...");

    for (const secret of variants) {
        console.log(`\nTesting secret: ${secret}`);
        cloudinary.config({
            cloud_name,
            api_key,
            api_secret: secret,
        });

        try {
            // Try to generate a signature and verify it? 
            // Easiest is to try a simple API call if possible, like usage
            // But checking ping is better.
            const result = await cloudinary.api.ping();
            console.log(`✅ SUCCESS! The correct secret is: ${secret}`);
            return;
        } catch (error) {
            // Ping might fail if credentials are wrong (http 401)
            console.log(`❌ Failed: ${(error as any).message || "Unknown error"}`);
        }
    }

    console.log("\n❌ All variants failed. Please copy-paste the API Secret from your dashboard.");
}

testConnection();
