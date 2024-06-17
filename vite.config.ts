import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import VueComponents from "unplugin-vue-components/vite";
import VueMarkdown from "unplugin-vue-markdown/vite";
import VueRouter from "unplugin-vue-router/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      dts: "src/typings/auto-imports.d.ts",
      include: [
        /\.ts$/, // .ts
        /\.vue$/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        "vue-i18n",
        "vue-router",
        "@vueuse/core",
        "@vueuse/head",
        "@vueuse/math",
        "pinia",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
      ],
    }),
    VueComponents({
      dts: "src/typings/components.d.ts",
      dirs: "src/components",
      extensions: ["vue", "md"],
      resolvers: [NaiveUiResolver()],
    }),
    VueRouter({
      dts: "src/typings/typed-router.d.ts",
      extensions: [".vue", ".md"],
      routesFolder: "src/pages",
    }),
    VueMarkdown({}),
    Icons({
      compiler: "vue3",
    }),
  ],
}));
