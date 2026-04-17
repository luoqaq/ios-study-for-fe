import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 850,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 第三方依赖拆分为独立 chunk
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          }

          // 按模块拆分页面组件，避免主 chunk 过大
          if (id.includes("/src/pages/advanced/")) return "advanced";
          if (id.includes("/src/pages/swift/")) return "swift";
          if (id.includes("/src/pages/uikit/")) return "uikit";
          if (id.includes("/src/pages/objc/")) return "objc";
          if (
            id.includes("/src/pages/starter/") ||
            id.includes("/src/pages/xcode/")
          ) {
            return "starter";
          }
          if (id.includes("/src/pages/practice/")) return "practice";
          if (
            id.includes("/src/pages/roadmap/") ||
            id.includes("/src/pages/guide/")
          ) {
            return "roadmap";
          }
        },
      },
    },
  },
});
