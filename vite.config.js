import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works under the GitHub Pages sub-path
// (https://<user>.github.io/Peak_Prep/) without hardcoding the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
})
