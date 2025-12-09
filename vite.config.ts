import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt"],
      manifest: {
        name: "Kisan Vyapar App",
        short_name: "KisanApp",
        description: "Local testing PWA for Kisan Vyapar",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "project2.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "project2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
  server: {
    allowedHosts: [
      "https://59b43e1b58eb.ngrok-free.app"
    ],
    port: 5174,
    host: true
  }
})
=======
})
>>>>>>> dce4279cffe38f5e5e4e2544cd8b17c1917ddea4
