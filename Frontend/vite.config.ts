import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.BACKEND_URL),
      'import.meta.env.VITE_FRONTEND_URL': JSON.stringify(env.FRONTEND_URL),
    },
    plugins: [tailwindcss()],
  }
})
