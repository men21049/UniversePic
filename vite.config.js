import { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    proxy: {
      // '/api': 'https://api.nasa.gov',
      "/api": {
        target: "https://api.nasa.gov", // The real API server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // (optional) Set to false if you're having SSL issues
        rewrite: (path) => {
          // 1. Remove the '/api' prefix
          const newPath = path.replace(/^\/api/, "");

          // 2. Get the API key from your .env file
          const apiKey = process.env.NASA_API_KY;

          // 3. Add the API key to the request URL
          // Checks if the URL already has query parameters
          const separator = newPath.includes("?") ? "&" : "?";
          console.log(
            `Rewriting path: ${newPath}${separator}api_key=${apiKey}`
          );
          return `${newPath}${separator}api_key=${apiKey}`;
        },
      },
    },
  },
});
