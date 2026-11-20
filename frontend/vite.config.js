import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function readLocalEnv() {
  try {
    return Object.fromEntries(
      readFileSync(new URL('./local.env', import.meta.url), 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => {
          const separator = line.indexOf('=')
          return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')]
        }),
    )
  } catch {
    return {}
  }
}

const localEnv = readLocalEnv()

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL || localEnv.VITE_API_BASE_URL || 'https://gnu-rahp.onrender.com',
    ),
  },
})
