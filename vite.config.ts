import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_utils.scss";
        @import "@/assets/styles/_variables.scss";
        @import "@/assets/styles/_colors.scss";
        `,
      },
    },
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
