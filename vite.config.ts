import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'antd': ['antd'],
          'antd-icons': ['@ant-design/icons'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'tanstack-query': ['@tanstack/react-query'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})
