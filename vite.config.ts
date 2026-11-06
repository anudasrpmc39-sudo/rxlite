import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // For GitHub Pages, change this to "/rxlite/" if the repository is named "rxlite".
  // For a custom domain or username.github.io repository, use "/".
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.svg"],
      manifest: {
        name: "RxLite GP Prescription Writer",
        short_name: "RxLite",
        description: "Local-first prescription writing tool",
        theme_color: "#0f766e",
        background_color: "#f5f8f8",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
        ]
      },
      workbox: { navigateFallback: "/index.html" }
    })
  ]
});