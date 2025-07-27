/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		globals: true, // usar describe, it, expect sem importar
		environment: "jsdom", // simula o navegador
		setupFiles: "./src/test/setup.ts", // setup para jest-dom
	},
});
