import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        // Default allowed folders
        "./client",
        "./shared",
        "node_modules/vite/dist/client",

        // ✅ Add your full project path explicitly
        "/Users/shaheaalam/Downloads/ShaheAalam"
      ],
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "server/**"
      ],
    },
  },

  build: {
    outDir: "dist/spa",
  },

  plugins: [
    react(),
    expressPlugin() // Keep your Express middleware alive
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during dev
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
