
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    target: 'es2015', // Ensures compatibility with slightly older devices
    cssTarget: 'chrome61', // Prevents CSS modern features from breaking layout
  }
});
