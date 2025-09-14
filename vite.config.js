import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  define: {
    __BUILD_VERSION__: JSON.stringify(Date.now()),
  },
  plugins: [react()],
  build: {
    sourcemap: true,
      outDir: "dist",
  },
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://tasteorama-backend-dcjy.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
