import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', 
              '**/dist/**',
              '**/cypress/**',
              '**/.{idea,git,cache,output,temp}/**',
              '**/test/playwright/**',
              '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*']
  },
})