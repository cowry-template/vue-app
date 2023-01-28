import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),

      // 支持svg-cion
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "./src/assets/icons")],
        symbolId: "icon-[name]",
      }),

      AutoImport({
        // 可直接使用vue、router中的composition api，无需再import
        imports: ["vue", "vue-router"],
      }),

      // 压缩资源
      viteCompression(),

      // setup语法糖name增强，使vue3语法糖支持name属性。 <script setup name="Home">
      // vue3语法糖默认是没有name属性的，在我们使用keep-alive的时候需要用到name
      vueSetupExtend(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8899,
      open: true,
    },
  });
};
