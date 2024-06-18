import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "path";
import AutoImportPlugin from "unplugin-auto-import/vite";
import IconsPlugin from "unplugin-icons/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import VueComponentsPlugin from "unplugin-vue-components/vite";
import VueMarkdownPlugin from "unplugin-vue-markdown/vite";
import VueRouterPlugin from "unplugin-vue-router/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import PACKAGE from "./package.json";

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
  define: {
    "process.env.PACKAGE_REPOSITORY": JSON.stringify(PACKAGE.repository),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    AutoImportPlugin({
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
    VueComponentsPlugin({
      dts: "src/typings/components.d.ts",
      dirs: "src/components",
      extensions: ["vue", "md"],
      resolvers: [NaiveUiResolver()],
    }),
    VueRouterPlugin({
      dts: "src/typings/typed-router.d.ts",
      extensions: [".vue", ".md"],
      routesFolder: "src/pages",
    }),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/locales/**.json"),
    }),
    VueMarkdownPlugin({}),
    IconsPlugin({
      compiler: "vue3",
    }),
  ],
}));
