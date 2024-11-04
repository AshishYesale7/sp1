import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'video-vendor': ['video.js', '@videojs/http-streaming', 'plyr', 'hls.js'],
          'ui-vendor': ['@headlessui/react', 'lucide-react'],
          'state-vendor': ['@reduxjs/toolkit', 'react-redux', 'react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-query',
      'react-redux',
      '@reduxjs/toolkit',
      'lucide-react',
      '@headlessui/react'
    ]
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
});