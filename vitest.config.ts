import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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