import path from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteStaticCopy } from "vite-plugin-static-copy"
import fs from "fs-extra"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		{
			name: "copy-assets-after-build",
			closeBundle: async () => {
				try {
					// Ensure the destination directories exist
					await fs.ensureDir(path.resolve(__dirname, "build/static/js"))
					await fs.ensureDir(path.resolve(__dirname, "build/static/css"))

					// Copy index.js to static/js/main.js
					await fs.copy(
						path.resolve(__dirname, "build/assets/index.js"),
						path.resolve(__dirname, "build/static/js/main.js"),
					)

					// Copy index.css to static/css/main.css
					await fs.copy(
						path.resolve(__dirname, "build/assets/index.css"),
						path.resolve(__dirname, "build/static/css/main.css"),
					)

					console.log("Files copied successfully!")
				} catch (error) {
					console.error("Error copying files:", error)
				}
			},
		},
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: path.resolve(__dirname, "assets/index.js"),
		// 			dest: "static/js",
		// 			rename: "main.js",
		// 		},
		// 		{
		// 			src: path.resolve(__dirname, "assets/index.css"),
		// 			dest: "static/css",
		// 			rename: "main.css",
		// 		},
		// 	],
		// }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "build",
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
	server: {
		hmr: {
			host: "localhost",
			protocol: "ws",
		},
		cors: {
			origin: "*",
			methods: "*",
			allowedHeaders: "*",
		},
	},
})
