import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { viteSingleFile } from "vite-plugin-singlefile"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const htmlpreviewSafeScripts = {
  name: "htmlpreview-safe-script-tags",
  apply: "build",
  async closeBundle() {
    const outputPath = resolve("dist/index.html")
    const html = await readFile(outputPath, "utf8")
    await writeFile(outputPath, html.replaceAll("<script>", "\\x3Cscript>"))
  },
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), htmlpreviewSafeScripts],
})
