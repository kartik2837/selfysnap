// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })













import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  /* ═══════════════════════════════════════════════
     🔥 DEV SERVER — Fast startup
     ═══════════════════════════════════════════════ */
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: false, // HMR error overlay off (faster)
    },
  },

  /* ═══════════════════════════════════════════════
     🔥 BUILD — Production optimizations
     ═══════════════════════════════════════════════ */
  build: {
    target: 'es2020',
    minify: 'esbuild',            // 🔥 Fast minifier
    sourcemap: false,             // 🔥 Bundle chhota
    cssCodeSplit: true,           // 🔥 CSS split per chunk

    /* 🔥 Chunk splitting — bada chunk todo */
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'query-vendor': ['@tanstack/react-query'],
          'chart-vendor': ['recharts'],
        },
      },
    },

    chunkSizeWarningLimit: 1000,  // 1MB warning threshold
  },

  /* ═══════════════════════════════════════════════
     🔥 DEPS OPTIMIZATION — Dev fast
     ═══════════════════════════════════════════════ */
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      '@reduxjs/toolkit',
      '@tanstack/react-query',
      'axios',
    ],
  },
});