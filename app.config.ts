import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")]
      }
    }
  }
});
