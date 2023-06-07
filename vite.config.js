// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd(), "");

export default defineConfig({
  // base: "/nfl-satistics/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: env.VITE_NFL_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/'),
      },
    },
    debug: true,
  },
});


// References
// https://vitejs.dev/config/
// https://vitejs.dev/config/server-options.html