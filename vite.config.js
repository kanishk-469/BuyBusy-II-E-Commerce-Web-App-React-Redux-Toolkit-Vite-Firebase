import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/buybusy/", // 👈  tells Vite your app lives inside /buybusy/
});
