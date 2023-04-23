import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: '/src',
        },
    },
    server: {
        proxy: {
          '/api': {
            target: 'http://localhost:4200',
            changeOrigin: true,
          }
        }
      }
});