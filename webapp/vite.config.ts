import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import { parsePublicEnv } from './src/lib/parsePublicEnv'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const publicEnv = parsePublicEnv(env)
  return {
    plugins: [react()],
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
    define: {
      'process.env': JSON.stringify(publicEnv),
    },
  }
})
