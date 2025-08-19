import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "app/provider/router",
      generatedRouteTree: "app/provider/router/routeTree.gen.ts",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@svg": path.resolve(__dirname, "./shared/svg/"),
      "@styles": path.resolve(__dirname, "./shared/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/index.scss" as *;\n`,
      },
    },
  },
  root: ".",
});
