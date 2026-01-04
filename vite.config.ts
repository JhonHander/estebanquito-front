import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Vite configuration for the Estebanquito frontend application
 * Configures React plugin, path aliases for clean imports, and development server with API proxy
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Path aliases enable clean imports like '@/features/auth' instead of relative paths
    // Improves code maintainability and reduces import path complexity
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 5173,
    // API proxy enables seamless development without CORS issues
    // Routes /api requests to the backend server during development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
