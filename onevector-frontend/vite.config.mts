import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    port: 3001, // Frontend runs on port 3001
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
