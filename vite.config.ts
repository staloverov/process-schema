import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#src": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), svgrPlugin(), reactRefresh()],
});
