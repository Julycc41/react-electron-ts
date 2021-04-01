import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  root: process.cwd(),
  server: { port: 3344 },
  base: "./",
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$themeGreen: #14ff00;
        $themeRed: #ff0600;
        $themeYellowLight: rgb(250, 215, 90);
        $themeYellowDark: #e3c122;
        $themeGray: rgb(206, 206, 206);
        $themeGrayMid: rgb(230, 230, 230);
        $themeGrayDark: rgb(94, 94, 94);
        $themeTransDark: rgba(26, 26, 26, 0.74);
        $themeBlack: #111111;
        $themeShadow: 0px 4px 20px 0px rgba(199, 199, 199, 0.5);
        `,
      },
    },
  },
});
